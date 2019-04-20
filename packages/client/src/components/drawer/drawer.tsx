import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as cuid from 'cuid';
import { match, withRouter, RouteComponentProps } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Grid, Icons, ClickableIcon } from '@components';
import { actions } from '@ducks/doday-app';
import { DodayAppPaths, DrawerMenuItem } from '@lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { DodayAppMenuCell } from '../shared/_organisms/grid/doday-app-menu-cell/doday-app-menu-cell';
import { Goal } from '@root/lib/models/entities/Goal';
import { PushToNavigationStackByDIDAction } from '@root/ducks/doday-app/actions';
import Media from 'react-media';
import { LayoutBlock } from '../shared/_atoms/layout-block';

const css = require('./_drawer.module.scss');

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
    text: 'Public dodays',
    icon: 'Apps',
    action: 'changePath',
    path: 'public',
  },
];

export class DrawerComponent extends React.Component<
  DrawerProps & PropsFromConnect & RouteComponentProps & Actions,
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
        <div className={css.drawerProfileContainerCollapsed}>
          <LayoutBlock
            align="flex-center"
            valign="vflex-center"
            childFlex={false}
            className={css.drawerProfileAvatarCollapsed}
          >
            <Icons.Dodayman width={30} height={30} />
          </LayoutBlock>
        </div>
      );
    } else {
      return (
        <div className={css.drawerProfileContainer}>
          <LayoutBlock
            align="flex-center"
            valign="vflex-center"
            className={css.drawerProfileAvatar}
          >
            <Icons.Dodayman width={60} height={60} />
          </LayoutBlock>
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
      return <div className={css.drawerLevel}>1</div>;
    } else {
      return (
        <div
          onClick={() => this.props.history.push('/profile')}
          className={css.drawerLevel}
        >
          <span className={css.drawerLevelLabel}>1 Level, Novice</span>
          <div
            className={css.drawerLevelProgress}
            style={{ width: `${42}%` }}
          />
          <div className={css.drawerLevelProgressBg} />
        </div>
      );
    }
  };

  renderDrawerFooterIcon = () => {
    const { collapsed, toggle } = this.props;

    if (collapsed) {
      return (
        <div className={css.drawerFooter}>
          <ClickableIcon className={css.drawerToggleButton} onClick={toggle}>
            <Icons.DoubleChevronIcon right />
          </ClickableIcon>
        </div>
      );
    } else {
      return (
        <div className={css.drawerFooter}>
          <ClickableIcon className={css.drawerToggleButton} onClick={toggle}>
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
      [css.drawerContainerCollapsed]: collapsed,
      [css.drawerContainer]: !collapsed,
    });

    return (
      <div className={classNames}>
        {this.renderDrawerProfileSection()}
        {this.renderDrawerLevel()}
        <ul role="navigation" className={css.drawerMenu}>
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
        <Media query="(min-width: 1100px)">
          {this.renderDrawerFooterIcon()}
        </Media>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  badge: state.dodayApp.badge,
  path: state.dodayApp.path,
  goals: state.dodayApp.goals,
});

export default withRouter(
  connect(
    mapState,
    { ...actions }
  )(DrawerComponent)
);
