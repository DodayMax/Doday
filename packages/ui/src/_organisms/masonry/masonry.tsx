/* tslint:disable */

/**
 * Masonry Component for React
 * @author Cole Turner <turner.cole@gmail.com | www.cole.codes>
 * 
 * If you use this, please retain the author name.
 * Please PR any new features you add so that others can enjoy
 * the blood sweat and tears of open source.
 * 
 * Features:
 *  - Masonry Layout
 *    A) Items must have fixed column width
 *    B) Items can span multiple columns
 *    C) Layout will be precalculated but only if the number of items has changed
 *        - This engine was designed for a static order placement
 *          and was not designed for reordering
 *    D) New items will layout if the previous layout parameters still apply
 *    E) Function `getState` returns either Redux or local component state
 *  - Infinite Scroll
 * 
 * 
 * How to use:
    const myArrayOfItems = [{ name: 'Hello' }, { name: 'World' }]
    <Masonry
      items={myArrayOfItems}
      itemComponent={MyMasonryItem}
      alignCenter={true}
      containerClassName="masonry"
      layoutClassName="masonry-view"
      pageClassName="masonry-page"
      loadingElement={<span>Loading...</span>}
      columnWidth={columnWidth}
      columnGutter={columnGutter}
      hasMore={this.props.hasMore}
      isLoading={this.props.isFetching}
      onInfiniteLoad={this.onFetch}
      getState={this.props.getState}
    />

*  How to layout your item:
    class MyMasonryItem extends React.Component {
      static getColumnSpanFromProps = ({ isFeatured }, getState) => {
        if (isFeatured) {
          return 2;
        }
        return 1;
      }
      static getHeightFromProps = (getState, props, columnSpan, columnGutter) => {
        return IMAGE_HEIGHT + TITLE_HEIGHT + FOOTER_HEIGHT;
      }
      
      render() {
        ...
      }
    }
 */

import * as React from 'react';
import { Box } from '@material-ui/core';
import { throttle, isEqual } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../..';
import { Entity } from '@doday/lib';

const noPage = { stop: 0 };
const sortAscending = (a: any, b: any) => a - b;
const sortTopByAscending = (a: any, b: any) => a.top - b.top;

export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  key: string;
  columnSpan?: number;
  item?: Entity;
}

type Page = {
  index: number;
  items: LayoutItem[];
  visible: boolean;
  start: number;
  stop: number;
};

type Position = {
  column: any;
  left: number;
  top: number;
};

interface LayoutItem extends Partial<Position> {
  props: any;
  column: number;
  columnSpan: number;
  height: any;
  width: number;
}

interface MasonryProps {
  header?: () => React.ReactNode;
  alignCenter: boolean;
  columnGutter: number;
  columnMinWidth: number;
  columnWidth?: number;
  containerClassName?: string;
  layoutClassName?: string;
  pageClassName?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  items: any[];
  itemComponent: React.ComponentType<any>;
  itemHeight?: number;
  noDataComponent?: React.ComponentType;
  itemProps?: {};
  loadingElement: React.ReactNode;
  onInfiniteLoad?: () => void;
  threshold?: number;
  scrollAnchor?: HTMLElement;
  scrollOffset?: number;
  rerenderProps?: any[];
}

interface MasonryState {
  averageHeight: number;
  pages: Page[];
  maxColumns?: number;
  lastWorkingPage?: Page;
  lastWorkingIndex?: number;
  calculatedColumnWidth?: number;
  columnHeights?: number[];
  columnGaps?: number[];
}

const DEFAULT_ITEM_HEIGHT = 374;

export class Masonry extends React.PureComponent<MasonryProps, MasonryState> {
  node?: HTMLDivElement | null;

  static defaultProps = {
    alignCenter: true,
    containerClassName: 'masonry collection-group',
    layoutClassName: 'masonry-view',
    pageClassName: 'masonry-page',
    loadingElement: (
      <Box justifyContent="center" alignItems="center">
        <Icons.InlineLoader color="#fff" />
      </Box>
    ),
    // noDataComponent: NoDataMock,
  };
  state: MasonryState = {
    averageHeight: this.props.itemHeight || DEFAULT_ITEM_HEIGHT,
    pages: [],
  };

  componentDidMount() {
    const scrollNode = this.props.scrollAnchor
      ? this.props.scrollAnchor
      : this.node;
    this.layout(this.props);
    setTimeout(() => this.onScroll(), 0);
    if (scrollNode) scrollNode.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    const scrollNode = this.props.scrollAnchor
      ? this.props.scrollAnchor
      : this.node;
    if (scrollNode) scrollNode.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.items.length !== this.props.items.length) {
      this.layout(this.props);
      return;
    }

    /** Rerender after transitions */
    if (prevProps.rerenderProps !== this.props.rerenderProps) {
      setTimeout(() => this.layout(this.props), 300);
      return;
    }

    /**
     * compare items for optimistic updates and rerender if
     * some item changed
     */
    let needUpdate;
    prevProps.items.map((prevItem: any, index: number) => {
      if (!isEqual(prevItem, this.props.items[index])) {
        needUpdate = true;
      }
      return prevItem;
    });
    if (needUpdate) this.layout(this.props);
  }

  onResize = throttle(
    () => {
      this.layout(this.props, true);
    },
    50,
    { trailing: true }
  );

  layout(props: any, rearrange = false) {
    if (!this.node) {
      return;
    }

    const {
      columnWidth,
      columnMinWidth,
      columnGutter,
      items,
      itemComponent,
    } = props;

    if (!itemComponent.calculateHeight) {
      throw new Error(`ItemComponent does not respond to 'calculateHeight'`);
    }

    const heightSelector = itemComponent.calculateHeight;

    // Decide a starter position for centering
    const viewableWidth = this.node.offsetWidth;
    const viewableHeight = this.getViewableHeight();
    const maxColumns = columnWidth
      ? Math.floor(viewableWidth / (columnWidth + columnGutter)) || 1
      : (viewableWidth > columnMinWidth &&
          Math.floor(viewableWidth / (columnMinWidth + columnGutter))) ||
        1;
    const calculatedColumnWidth = columnWidth
      ? columnWidth
      : Math.ceil(viewableWidth / maxColumns);
    const spannableWidth =
      maxColumns * calculatedColumnWidth + columnGutter * (maxColumns - 1);
    const viewableStart = this.props.alignCenter
      ? (viewableWidth - spannableWidth) / 2
      : 0;

    // Setup bounds and limiters for deciding how to stage items in a page
    const itemsPerPage =
      maxColumns * Math.ceil(viewableHeight / this.state.averageHeight);
    const top = Math.max(0, this.getScrollTop() + this.getScrollOffset());

    // Here we decide if we layout the entire grid or just new items
    const shouldRearrange =
      rearrange ||
      !this.state.lastWorkingPage ||
      this.state.lastWorkingIndex === null ||
      maxColumns !== this.state.maxColumns;

    // Setup our boundaries for layout
    const columnHeights = shouldRearrange
      ? new Array(maxColumns).fill(0)
      : this.state.columnHeights;
    const columnGaps = shouldRearrange
      ? new Array(maxColumns).fill([])
      : this.state.columnGaps;

    const initialWorkingPages = shouldRearrange ? [] : this.state.pages;
    const itemsToLayout = shouldRearrange
      ? items
      : items.slice(this.state.lastWorkingIndex || 0 + 1);

    let column = 0;
    let lastWorkingIndex = null;

    const stagedItems: any = [];
    const pages = itemsToLayout
      .reduce((workingPages: any, itemProps: any) => {
        // Decide which page we are on
        let workingPage = null;

        if (workingPages.length) {
          workingPage = workingPages[workingPages.length - 1];
        }

        if (!workingPage || workingPage.items.length >= itemsPerPage) {
          workingPage = { index: workingPages.length, items: [] };
          workingPages.push(workingPage);
        }

        // Ok now we have an item, let's decide how many columns it spans
        const columnSpan = Math.min(maxColumns, 1);

        // Check if the column will exceed maxColumns
        if (column + columnSpan > maxColumns) {
          column = 0;
        }

        // Determine the height of this item to stage
        const height = heightSelector(
          itemProps,
          calculatedColumnWidth,
          columnSpan,
          columnGutter
        );

        if (isNaN(height)) {
          console.warn(
            `Skipping feed item with props ${JSON.stringify(
              itemProps
            )} because "${height}" is not a number.`
          );
          return workingPages;
        }

        const item: LayoutItem = {
          props: itemProps,
          column,
          columnSpan,
          height,
          width:
            columnSpan * calculatedColumnWidth +
            (columnSpan - 1) * columnGutter,
        };

        // Here is where the magic happens
        // First we take a slice of the items above
        const previousSlicedItems = stagedItems.slice(-1 * itemsPerPage);

        // Let's fill any gaps if possible.
        const positionWithinGap = this.findPositionInGaps(
          Object.values(columnGaps!),
          maxColumns,
          columnSpan,
          height,
          viewableStart,
          calculatedColumnWidth
        );

        if (positionWithinGap) {
          Object.assign(item, positionWithinGap);
        } else {
          // And then for good measure, transverse up a little more to catch any items staged below
          stagedItems
            .slice(stagedItems.length - 1 - itemsPerPage, -1 * itemsPerPage)
            .forEach((previousItem: any) => {
              if (
                previousSlicedItems.some(
                  (previousSlicedItem: any) =>
                    previousSlicedItem.top < previousItem.top
                )
              ) {
                previousSlicedItems.push(previousItem);
              }
            });

          previousSlicedItems.sort(sortTopByAscending);

          // Then find the smallest column
          const position = this.findPositionForItem(
            columnSpan,
            maxColumns,
            columnHeights,
            viewableStart,
            calculatedColumnWidth
          );
          Object.assign(item, position);
        }

        const minPreviousSlicedItemTop = Math.min(
          ...previousSlicedItems.map((i: any) => i.top)
        );

        columnHeights!
          .slice(item.column, item.column + columnSpan)
          .forEach((thisColumn, index) => {
            // Remove any gaps we're overlaying
            columnGaps![item.column + index] = columnGaps![
              item.column + index
            ].filter((gap: any) => {
              const [gapTop, gapHeight] = gap;
              if (
                // If we filled the gap
                (item.top! <= gapTop && item.top + item.height >= gapTop) ||
                (item.top! >= gapTop && item.top! <= gapTop + gapHeight) ||
                // or if the gap is above our fill zone
                gapTop < minPreviousSlicedItemTop
              ) {
                return false;
              }

              return true;
            });

            // Add a gap if we've created one
            if (item.top! > thisColumn) {
              columnGaps![item.column + index].push([
                thisColumn,
                item.top! - thisColumn - this.props.columnGutter,
              ]);
            }

            columnHeights![item.column + index] = Math.max(
              thisColumn,
              item.top + item.height + columnGutter
            );
          });

        column += columnSpan;

        workingPage.items.push(item);
        stagedItems.push(item);
        lastWorkingIndex = items.indexOf(itemProps); // not `item`!!

        return workingPages;
      }, initialWorkingPages)
      .map((page: any) => {
        // Calculate when a page starts and stops
        // To determine which pages are visible
        const itemsTop = page.items.map((item: any) => item.top);

        page.start = !itemsTop.length ? 0 : Math.min(...itemsTop);
        page.stop = Math.max(
          0,
          ...page.items.map((item: any) => item.top + item.height)
        );

        page.visible = this.isPageVisible({ page, top, viewableHeight });

        return page;
      });

    // Facilitate the average height for next layout's itemsPerPage
    const averageHeight = Math.round(
      stagedItems
        .map((item: any) => item.height)
        .reduce((prev: any, val: any) => prev + val, 0) / stagedItems.length
    );

    this.setState({
      pages,
      lastWorkingIndex: lastWorkingIndex || 0,
      averageHeight,
      columnHeights,
      calculatedColumnWidth,
      columnGaps,
      maxColumns,
    });
  }

  findPositionForItem(
    columnSpan: any,
    maxColumns: any,
    columnHeights: any,
    viewableStart: any,
    calculatedColumnWidth: any
  ) {
    // If it spans one column, return the shortest column
    if (columnSpan === 1) {
      const smallestHeight = columnHeights.slice(0).sort(sortAscending)[0];
      const column = columnHeights.indexOf(smallestHeight);
      const left = Math.round(
        this.getLeftPositionForColumn(
          column,
          viewableStart,
          calculatedColumnWidth
        )
      );
      const top = Math.round(columnHeights[column]);

      return {
        column,
        left,
        top,
      };
    }

    // Find columns to span that will create the shortest gap
    const columnGaps = columnHeights
      .slice(0, maxColumns - columnSpan + 1) // only measure columns it can span
      .reduce((gapReduction: any, thisColumnHeight: any, column: any) => {
        if (thisColumnHeight < columnHeights[column + 1]) {
          // If this item clips the next column, overextend
          gapReduction[column] = columnHeights[column + 1];
        } else {
          // Determine how much of a gap will be created if we start in this column
          const columnsToMeasure = columnHeights.slice(
            column,
            column + columnSpan
          );

          gapReduction[column] =
            Math.max(...columnsToMeasure) - Math.min(...columnsToMeasure);
        }
        return gapReduction;
      }, []);

    const column = columnGaps.indexOf(
      columnGaps.slice(0).sort(sortAscending)[0]
    );
    const maxSpannedHeight = Math.max(
      ...(columnHeights.length
        ? columnHeights.slice(column, column + columnSpan)
        : [])
    );
    const top = Math.round(
      maxSpannedHeight === -Infinity ? 0 : maxSpannedHeight
    );
    const left = Math.round(
      this.getLeftPositionForColumn(
        column,
        viewableStart,
        calculatedColumnWidth
      )
    );

    return {
      column,
      left,
      top,
    };
  }

  findPositionInGaps = (
    gapColumns: any,
    maxColumns: any,
    columnSpan: any,
    height: any,
    viewableStart: any,
    calculatedColumnWidth: any
  ) => {
    if (columnSpan === 1) {
      // Easy, find the first gap

      for (let column = 0; column < gapColumns.length; column++) {
        const testColumn = gapColumns[column];
        const gap = testColumn.find((g: any) => g[1] >= height);

        if (gap) {
          const left = Math.round(
            this.getLeftPositionForColumn(
              column,
              viewableStart,
              calculatedColumnWidth
            )
          );

          return {
            left,
            top: gap[0],
            column,
          };
        }
      }
    }

    if (!gapColumns.some((column: any) => column.length > 0)) {
      return null;
    }

    // Much more difficult
    // only measure columns it can span
    const fillableColumnGaps = gapColumns
      .slice(0, maxColumns - columnSpan + 1)
      .reduce((workingColumns: any, thisColumnGaps: any, columnIndex: any) => {
        workingColumns[columnIndex] = thisColumnGaps.filter(
          (g: any) => g[1] >= height
        );
        return workingColumns;
      }, new Array(gapColumns.length).fill([]));

    // Sorry this is going to get verbose
    const spannableColumnGaps = fillableColumnGaps.reduce(
      (acc: any, thisColumn: any, index: any) => {
        // Filter out columns
        acc[index] = thisColumn.filter((thisColumnGap: any) => {
          const [thisColumnGapTop, thisColumnGapHeight] = thisColumnGap;

          // Where the item can't span next columns
          const nextColumns = fillableColumnGaps.slice(index + 1);
          return nextColumns.every((nextSpannableColumn: any) => {
            // By looking for a gap it can fit into
            return nextSpannableColumn.find((nextSpannableColumnGap: any) => {
              const [
                nextSpannableColumnGapTop,
                nextSpannableColumnGapHeight,
              ] = nextSpannableColumnGap;

              // only if it can slide right in there ;)
              return (
                nextSpannableColumnGapTop <= thisColumnGapTop &&
                nextSpannableColumnGapTop + nextSpannableColumnGapHeight >=
                  thisColumnGapTop + thisColumnGapHeight
              );
            });
          });
        });

        return acc;
      },
      new Array(fillableColumnGaps.length).fill([])
    );

    // Now interate through the message
    for (let column = 0; column < spannableColumnGaps.length; column++) {
      if (spannableColumnGaps[column].length) {
        const gap = spannableColumnGaps[column][0];
        const left = Math.round(
          this.getLeftPositionForColumn(
            column,
            viewableStart,
            calculatedColumnWidth
          )
        );

        return {
          left,
          top: gap[0],
          column,
        };
      }
    }

    // I have failed you
    return null;
  };

  findItemsInSameColumn(itemList: any, item: any) {
    return itemList.filter((upperItem: any) => {
      return (
        item.column === upperItem.column ||
        (item.column >= upperItem.column &&
          item.column + item.columnSpan <=
            upperItem.column + upperItem.columnSpan)
      );
    });
  }

  getLeftPositionForColumn(
    column: any,
    viewableStart: any,
    calculatedColumnWidth: any
  ) {
    return (
      viewableStart + column * (calculatedColumnWidth + this.props.columnGutter)
    );
  }

  onScroll = throttle(
    () => {
      console.log('onScroll');
      if (!this.node) {
        return;
      }

      this.checkVisibility();
      this.checkInfiniteLoad();
    },
    100,
    { leading: true, trailing: true }
  );

  checkVisibility() {
    const viewableHeight = this.getViewableHeight();
    const top = Math.max(0, this.getScrollTop() - this.getScrollOffset());

    let isChanged = false;

    const pages = this.state.pages.map(page => {
      const visible = this.isPageVisible({ page, top, viewableHeight });

      isChanged = isChanged || page.visible !== visible;

      return {
        ...page,
        visible,
      };
    });

    if (isChanged) {
      this.setState({ pages });
    }
  }

  isPageVisible({ page, top, viewableHeight }: any) {
    const { start, stop } = page;
    const extraThreshold = viewableHeight;
    // trigger area = viewable area with buffer areas
    if (
      (start >= top - extraThreshold &&
        stop <= top + viewableHeight + extraThreshold) || // If page starts and stops within the trigger area
      (start <= top + extraThreshold && stop >= top - extraThreshold) || // If page starts before and runs within trigger area
      (start >= top - extraThreshold &&
        start <= top + viewableHeight + extraThreshold) || // If page starts within the trigger area
      (stop > top - extraThreshold &&
        stop <= top + viewableHeight + extraThreshold) // If the page stops within the trigger area
    ) {
      return true;
    }

    return false;
  }

  checkInfiniteLoad() {
    const scrollNode = this.props.scrollAnchor
      ? this.props.scrollAnchor
      : this.node;
    if (
      this.props.threshold! >
        scrollNode!.scrollHeight -
          (this.getScrollTop() + scrollNode!.clientHeight) &&
      this.props.hasMore
    ) {
      this.props.onInfiniteLoad!();
      return;
    }
  }

  getScrollTop() {
    return this.props.scrollAnchor
      ? this.props.scrollAnchor.scrollTop
      : this.node!.scrollTop;
  }

  getScrollOffset() {
    return this.props.scrollAnchor
      ? this.props.scrollAnchor.offsetTop
      : this.node!.offsetTop;
  }

  getViewableHeight() {
    return this.props.scrollAnchor
      ? this.props.scrollAnchor.offsetHeight
      : this.node!.offsetHeight;
  }

  onReference = (node: any) => {
    this.node = node && node.parentNode;
  };

  loadingElement = () => (
    <Box justifyContent="center" alignItems="center">
      <Icons.InlineLoader color="#fff" />
    </Box>
  );

  render() {
    const {
      header,
      containerClassName,
      layoutClassName,
      pageClassName,
      hasMore,
      loadingElement = this.loadingElement,
      isLoading,
      itemComponent: Item,
    } = this.props;

    const { pages } = this.state;

    const layoutHeight = (pages[pages.length - 1] || noPage).stop;

    return (
      <>
        <div
          ref={this.onReference}
          style={{
            width: '100%',
          }}
          className={classNames(containerClassName)}
        >
          {header && header()}
          {pages.reduce((acc: LayoutItem[], page) => acc.concat(page.items), [])
            .length ? (
            <div
              className={classNames(layoutClassName)}
              style={{
                height: `${layoutHeight}px`,
                position: 'relative',
              }}
            >
              {pages.map((page, index) => {
                if (!page.visible) {
                  return null;
                }

                return (
                  <div className={classNames(pageClassName)} key={index}>
                    {page.items.map(
                      ({ props, left, top, width, columnSpan }, itemIndex) => {
                        return (
                          <Item
                            key={itemIndex}
                            columnspan={columnSpan}
                            style={{
                              position: 'absolute',
                              left: left + 'px',
                              top: top + 'px',
                              width: width + 'px',
                            }}
                            item={props}
                          />
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          ) : isLoading ? (
            this.loadingElement()
          ) : (
            <>No data</>
          )}
          {hasMore && isLoading && (loadingElement || this.loadingElement())}
        </div>
      </>
    );
  }
}
