import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as cuid from 'cuid';
import { match } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Grid, Icons, ClickableIcon } from '@components';
import { actions } from '@ducks/doday-app';
import { dodayApp } from '@lib/constants';
import { RootState } from '@root/lib/models';
import { DodayAppMenuCell } from '../shared/_organisms/grid/doday-app-menu-cell/doday-app-menu-cell';
import { Goal } from '@root/lib/models/entities/Goal';

const styles = require('./_drawer.module.scss');

export interface DrawerMenuItem {
  text: string;
  icon: Icons.IconNames;
  actionName: string;
  payload: any;
  badge?: string | number;
}

interface DrawerProps {
  match?: match;
  collapsed: boolean;
  toggle: () => void;
}

interface DrawerState {
  activeIndex: number;
}

interface PropsFromConnect {
  badge: number;
  goals: Goal[];
}

interface Actions {
  changePath: (path: string) => void;
}

const items = [
  {
    text: 'Today',
    icon: 'TodayCalendar',
    action: 'changePath',
    payload: '',
  },
  {
    text: 'Goals',
    icon: 'Goal',
    action: 'changePath',
    payload: dodayApp.paths.goals,
  },
  {
    text: 'Memorizer',
    icon: 'Lighting',
    action: 'changePath',
    payload: dodayApp.paths.memos,
  },
  {
    text: 'Published by me',
    icon: 'Apps',
    action: 'changePath',
    payload: dodayApp.paths.createdByMe,
  },
];

export class DrawerComponent extends React.Component<
  DrawerProps & PropsFromConnect & Actions,
  DrawerState
> {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }
  renderDrawerProfileSection = () => {
    if (this.props.collapsed) {
      return (
        <div className={styles.drawerProfileContainerCollapsed}>
          <div className={styles.drawerProfileAvatarCollapsed} />
        </div>
      );
    } else {
      return (
        <div className={styles.drawerProfileContainer}>
          <div>
            {this.pieGoalsData && (
              <PieChart
                lineWidth={20}
                paddingAngle={5}
                data={this.pieGoalsData}
                onClick={(event, data, index) => {
                  console.log(event, data, index);
                  console.log(this.pieGoalsData[index]);
                }}
                style={{
                  width: '20rem',
                  height: '20rem',
                  color: '#222',
                  cursor: 'pointer',
                }}
              />
            )}
          </div>
        </div>
      );
    }
  };

  handleMenuClick = (item, index) => {
    const action = this.props[item.action];
    if (action) {
      action(item.payload);
    }
    this.setState({ activeIndex: index });
  };

  renderDrawerLevel = () => {
    if (this.props.collapsed) {
      return <div className={styles.drawerLevel}>1</div>;
    } else {
      return <div className={styles.drawerLevel}>1 Level, Novice</div>;
    }
  };

  renderDrawerFooterIcon = () => {
    const { collapsed, toggle } = this.props;

    if (collapsed) {
      return (
        <div className={styles.drawerFooter}>
          <ClickableIcon className={styles.drawerToggleButton} onClick={toggle}>
            <Icons.DoubleChevronIcon right />
          </ClickableIcon>
        </div>
      );
    } else {
      return (
        <div className={styles.drawerFooter}>
          <ClickableIcon className={styles.drawerToggleButton} onClick={toggle}>
            <Icons.DoubleChevronIcon left />
          </ClickableIcon>
        </div>
      );
    }
  };

  private get pieGoalsData() {
    const { goals } = this.props;
    const pieData: any = [];
    goals.map((goal, index) => {
      pieData.push({
        title: goal.name,
        value: (goal.children && goal.children.length) || 1,
        color: goal.color,
      });
    });
    return pieData.length ? pieData : undefined;
  }

  render() {
    const { collapsed, badge } = this.props;
    const classNames = classnames({
      [styles.drawerContainerCollapsed]: collapsed,
      [styles.drawerContainer]: !collapsed,
    });

    return (
      <div className={classNames}>
        {this.renderDrawerProfileSection()}
        {this.renderDrawerLevel()}
        <ul role="navigation" className={styles.drawerMenu}>
          <Grid
            items={items}
            renderCell={(item, index) => (
              <DodayAppMenuCell
                key={cuid()}
                collapsed={this.props.collapsed}
                item={item}
                active={index === this.state.activeIndex}
                onClick={() => this.handleMenuClick(item, index)}
              />
            )}
            collapsed={collapsed}
          />
        </ul>
        {this.renderDrawerFooterIcon()}
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  badge: state.dodayApp.badge,
  goals: state.dodayApp.goals,
});

export default connect(
  mapState,
  { ...actions }
)(DrawerComponent);
