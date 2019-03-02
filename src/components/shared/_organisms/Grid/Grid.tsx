import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as cuid from 'cuid';
import { actions } from '@ducks/doday-app';
import { DodayCell } from './doday-cell/doday-cell';
import { DodayAppMenuCell } from './doday-app-menu-cell/doday-app-menu-cell';
import { FolderCell } from './folder-cell/folder-cell';
import { Doday } from '@lib/common-interfaces';

const styles = require('./_grid.module.scss');

type GridCellTypes = 'DodayCell'
  | 'DodayAppMenuCell'
  | 'FolderCell';

interface GridProps {
  items: any[];
  cellType?: GridCellTypes;
  collapsed: boolean;
  history: any;
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

  handleMenuClick = (item, index) => {
    const action = this.props[item.action];
    if (action) {
      action(item.payload);
    }
    this.setState({ activeIndex: index });
  }

  handleDodayCellClick = (route: string) => {
    this.props.history.push(route);
  }

  handleFolderCellClick = (folder: Doday) => {
    // push folder to navigation stack
  }

  render() {
    const { items, cellType } = this.props;

    return (
      <div id="grid" className={styles.gridContainer}>
        {items.map((item: any, index) => {
          if (cellType) {
            switch(cellType) {
              case 'DodayCell':
                return <DodayCell doday={item} key={cuid()} />;
              case 'DodayAppMenuCell':
                return (
                  <DodayAppMenuCell
                    key={cuid()}
                    collapsed={this.props.collapsed}
                    item={item}
                    active={index === this.state.activeIndex}
                    onClick={() => this.handleMenuClick(item, index)}
                  />
                );
              default:
                return <div>Not cell specified.</div>;
            }
          } else {
            switch(item.type) {
              case 'action':
                return <DodayCell doday={item} key={cuid()} onClick={this.handleDodayCellClick} />;
              case 'folder':
                return <FolderCell doday={item} key={cuid()} onClick={this.handleFolderCellClick} />;
              default:
                return <div>Not cell specified for this type of doday.</div>;
            }
          }
        })}
      </div>
    );
  }
}

export default withRouter(connect(null, { ...actions })(GridComponent) as any) as any;