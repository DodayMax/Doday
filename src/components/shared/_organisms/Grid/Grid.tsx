import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as cuid from 'cuid';
import { actions } from '@ducks/doday-app';
import { Loader } from '@components';
import { DodayCell } from './doday-cell/doday-cell';
import { DodayAppMenuCell } from './doday-app-menu-cell/doday-app-menu-cell';
import { GoalCell } from './goal-cell/goal-cell';
import { Doday } from '@lib/common-interfaces';
import { PushToNavigationStackAction } from '@root/ducks/doday-app/actions';
import { LayoutBlock } from '../../_atoms/layout-block';

const styles = require('./_grid.module.scss');

type GridCellTypes = 'DodayCell'
  | 'DodayAppMenuCell'
  | 'GoalCell';

interface GridProps {
  items: any[];
  loading?: boolean;
  cellType?: GridCellTypes;
  collapsed: boolean;
  history: any;
}

interface PropsFromConnect {
  pushToNavStack: (doday: Doday) => PushToNavigationStackAction;
}

interface GridState {
  activeIndex: number;
}

export class GridComponent extends React.Component<GridProps & PropsFromConnect, GridState> {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  static defaultProps = {
    collapsed: false,
    loading: false,
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

  handleGoalCellClick = (goal: Doday) => {
    // push goal to navigation stack
    this.props.pushToNavStack(goal);
  }

  render() {
    const { items, cellType, loading } = this.props;
    return (
      <div id="grid" className={styles.gridContainer}>
        {loading &&
          <LayoutBlock align="flex-center" padding="0.6rem 0">
            <Loader />
          </LayoutBlock>
        }
        {!loading && items.map((item: any, index) => {
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
              case 'goal':
                return <GoalCell doday={item} key={cuid()} onClick={this.handleGoalCellClick} />;
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