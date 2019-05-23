import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { actions } from '@ducks/doday-app';
import { Loader, LayoutBlock } from '@shared';
import { Space } from '@root/lib/common-interfaces';
import { FilterItem } from './filter/filter-item';
import { Filter } from './filter/filter';
import { WithTranslation } from 'react-i18next';
import Input from '@material-ui/core/Input';
import {
  List,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

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

const css = (theme: Theme) =>
  createStyles({
    search: {
      height: `${theme.spacing.unit * 5}px`,
      fontSize: 16,
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
    listConainer: {
      overflowY: 'scroll',
      padding: '0 17px 0 0',
    },
  });

@(withRouter as any)
export class GridComponentClass extends React.Component<
  GridProps &
    Partial<RouteComponentProps> &
    Partial<WithTranslation> &
    WithStyles,
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
    const {
      items,
      loading,
      renderCell,
      filters,
      search,
      classes,
      t,
    } = this.props;

    return (
      <>
        {search && (
          <Input
            id="dodayapp-search"
            placeholder={t('dodayapp.search.placeholder')}
            className={classes.search}
            inputProps={{
              'aria-label': 'Search',
            }}
          />
        )}
        {filters &&
          filters.map((filter, index) => (
            <Filter key={index} items={filter} t={t} />
          ))}
        <List className={classes.listConainer}>
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
        </List>
      </>
    );
  }
}

export const Grid = connect(
  undefined,
  { ...actions }
)(withStyles(css)(GridComponentClass));
