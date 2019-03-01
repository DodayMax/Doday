import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@ducks/doday-app';
import { DodayCell } from './doday-cell/doday-cell';
import { DodayAppMenuCell } from './doday-app-menu-cell/doday-app-menu-cell';

const styles = require('./_grid.module.scss');

type GridCellTypes = 'DodayCell'
  | 'DodayAppMenuCell';

interface GridProps {
  items: any[];
  cellType: GridCellTypes;
  collapsed: boolean;
}

interface GridState {
  activeIndex: number;
}

export class GridComponent extends React.Component<GridProps, GridState> {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  static defaultProps = {
    collapsed: false,
  }

  handleRefresh = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    return promise;
  }

  handleClick = (item, index) => {
    const action = this.props[item.action];
    if (action) {
      action(item.payload);
    }
    this.setState({ activeIndex: index });
  }

  render() {
    const { items, cellType } = this.props;

    return (
      <div id="grid" className={styles.gridContainer}>
        {items.map((item: any, index) => {
          switch(cellType) {
            case 'DodayCell':
              return <DodayCell doday={item} />;
            case 'DodayAppMenuCell':
              return (
                <DodayAppMenuCell
                  collapsed={this.props.collapsed}
                  item={item}
                  active={index === this.state.activeIndex}
                  onClick={() => this.handleClick(item, index)}
                />
              );
            default:
              return <div>Not cell specified.</div>;
          }
        })}
      </div>
    );
  }
}

export default connect(null, { ...actions })(GridComponent);