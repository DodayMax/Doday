import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { actions } from '@ducks/doday-app';
import { Loader, LayoutBlock } from '@shared';
import { Space } from '@root/lib/common-interfaces';
import { FilterItem } from './filter/filter-item';
import { Filter } from './filter/filter';
import { Input } from '../../_atoms/input';
import { WithTranslation } from 'react-i18next';

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

@(withRouter as any)
export class GridComponentClass extends React.Component<
  GridProps & Partial<RouteComponentProps> & Partial<WithTranslation>,
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
    const { items, loading, renderCell, filters, search, t } = this.props;
    return (
      <>
        {search && (
          <Input
            placeholder={t('dodayapp.search.placeholder')}
            className={css.search}
          />
        )}
        {filters &&
          filters.map((filter, index) => (
            <Filter key={index} items={filter} t={t} />
          ))}
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

export const Grid = connect(
  undefined,
  { ...actions }
)(GridComponentClass);
