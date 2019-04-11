import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { actions } from '@ducks/doday-app';
import { Loader } from '@components';
import { LayoutBlock } from '../../_atoms/layout-block';

const styles = require('./_grid.module.scss');

interface GridProps {
  items: any[];
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
    const { items, loading, renderCell } = this.props;
    return (
      <ul id="grid" className={styles.gridContainer}>
        {loading && (
          <LayoutBlock align="flex-center" padding="0.6rem 0">
            <Loader />
          </LayoutBlock>
        )}
        {!loading &&
          items.map((item: any, index) => {
            return renderCell && renderCell(item, index);
          })}
      </ul>
    );
  }
}

export default withRouter(connect(
  undefined,
  { ...actions }
)(GridComponent) as any) as any;
