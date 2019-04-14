import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as cuid from 'cuid';
import { match } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Grid, Icons, ClickableIcon } from '@components';
import { actions } from '@ducks/doday-app';
import { DodayAppPaths, DrawerMenuItem } from '@lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { DodayAppMenuCell } from '../shared/_organisms/grid/doday-app-menu-cell/doday-app-menu-cell';
import { Goal } from '@root/lib/models/entities/Goal';
import { PushToNavigationStackByDIDAction } from '@root/ducks/doday-app/actions';

const styles = require('./_drawer.module.scss');

interface DrawerProps {
  match?: match;
  collapsed: boolean;
  toggle: () => void;
}

interface PropsFromConnect {
  badge: number;
  path: DodayAppPaths;
  goals: Goal[];
  pushToNavStackByDIDActionCreator?: (
    did: string
  ) => PushToNavigationStackByDIDAction;
}

interface Actions {
  changePath: (path: string) => void;
}

const items: DrawerMenuItem[] = [
  {
    text: 'Today',
    icon: 'TodayCalendar',
    action: 'changePath',
    path: '/',
  },
  {
    text: 'Goals',
    icon: 'Goal',
    action: 'changePath',
    path: 'goals',
  },
  {
    text: 'Memorizer',
    icon: 'Lighting',
    action: 'changePath',
    path: 'memos',
  },
  {
    text: 'Published by me',
    icon: 'Apps',
    action: 'changePath',
    path: 'createdByMe',
  },
];

export class DrawerComponent extends React.Component<
  DrawerProps & PropsFromConnect & Actions,
  {}
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
                  this.props.pushToNavStackByDIDActionCreator(data[index].did);
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
      action(item.path);
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
        did: goal.did,
        title: goal.name,
        value: (goal.children && goal.children.length) || 1,
        color: goal.color,
      });
    });
    return pieData.length ? pieData : undefined;
  }

  render() {
    const { collapsed, path } = this.props;
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
            renderCell={(item: DrawerMenuItem, index) => (
              <DodayAppMenuCell
                key={cuid()}
                collapsed={this.props.collapsed}
                item={item}
                active={item.path === path}
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
  path: state.dodayApp.path,
  goals: state.dodayApp.goals,
});

export default connect(
  mapState,
  { ...actions }
)(DrawerComponent);
