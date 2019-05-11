import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { actions } from '@ducks/doday-app';
import { Loader, LayoutBlock } from '@shared';
import { Space } from '@root/lib/common-interfaces';
import { FilterItem } from './filter/filter-item';
import { Filter } from './filter/filter';
import { Input } from '../../_atoms/input';

const css = require('./_grid.module.scss');

interface GridProps {
  items: any[];
  search?: boolean;
  filters?: FilterItem[][];
  loading?: boolean;
  renderCell: (item: any, index: number) => JSX.Element;
  collapsed: boolean;
}

interface GridState {
  activeIndex: number;
}

export class GridComponent extends React.Component<
  GridProps & RouteComponentProps,
  GridState
> {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  static defaultProps = {
    collapsed: false,
    loading: false,
  };

  handleRefresh = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    return promise;
  };

  render() {
    const { items, loading, renderCell, filters, search } = this.props;
    return (
      <>
        {search && (
          <Input placeholder="Type for search..." className={css.search} />
        )}
        {filters &&
          filters.map((filter, index) => <Filter key={index} items={filter} />)}
        <ul id="grid" className={css.gridContainer}>
          {loading && (
            <LayoutBlock
              align="flex-center"
              paddingAbove={Space.XSmall}
              paddingBelow={Space.XSmall}
            >
              <Loader />
            </LayoutBlock>
          )}
          {!loading &&
            items.map((item: any, index) => {
              return renderCell && renderCell(item, index);
            })}
        </ul>
      </>
    );
  }
}

export default withRouter(connect(
  undefined,
  { ...actions }
)(GridComponent) as any) as any;
