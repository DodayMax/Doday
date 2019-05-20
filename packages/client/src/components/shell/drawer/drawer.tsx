import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Trans, withTranslation, WithTranslation } from 'react-i18next';
import * as cuid from 'cuid';
import { match, withRouter, RouteComponentProps } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Grid, Icons, ClickableIcon } from '@shared';
import { actions } from '@ducks/doday-app';
import {
  clearSelectedDodayActionCreator,
  ClearSelectedDodayAction,
} from '@ducks/doday-details/actions';
import { DrawerMenuItem } from '@lib/common-interfaces';
import { RootState } from '@root/lib/models';
import { DodayAppMenuCell } from '../../shared/_organisms/grid/doday-app-menu-cell/doday-app-menu-cell';
import { ChangeDodayAppRouteAction } from '@root/ducks/doday-app/actions';
import Media from 'react-media';
import { LayoutBlock } from '../../shared/_atoms/layout-block';
import { capitalize } from '@root/lib/utils';
import { ToolBeacon } from '@root/tools/types';

const css = require('./_drawer.module.scss');

interface DrawerProps {
  toolBeacons: ToolBeacon[];
  match?: match;
  collapsed: boolean;
  toggle: () => void;
}

interface PropsFromConnect {
  dodayAppRoute: string;
  badge: number;
  changeDodayAppRouteActionCreator: (
    route: string
  ) => ChangeDodayAppRouteAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

const items: DrawerMenuItem[] = [
  {
    text: 'Schedule',
    route: '/schedule',
    icon: 'TodayCalendar',
  },
];

@(withRouter as any)
export class DrawerComponent extends React.Component<
  DrawerProps &
    PropsFromConnect &
    WithTranslation &
    Partial<RouteComponentProps>,
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
              onClick={(event, data, index) => {}}
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

  renderDrawerLevel = () => {
    if (this.props.collapsed) {
      return <div className={css.drawerLevel}>1</div>;
    } else {
      return (
        <div
          onClick={() => this.props.history.push('/profile')}
          className={css.drawerLevel}
        >
          <span className={css.drawerLevelLabel}>{`${1} ${this.props.t(
            'level'
          )}, ${this.props.t('ranks.novice')}`}</span>
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
    // const { goals } = this.props;
    // const pieData: any = [];
    // goals.map((goal, index) => {
    //   pieData.push({
    //     did: goal.did,
    //     title: goal.name,
    //     value: (goal.children && goal.children.length) || 1,
    //     color: goal.color,
    //   });
    // });
    // return pieData.length ? pieData : undefined;
    return null;
  }

  toolsToDrawerMenuItems(tools: ToolBeacon[]): DrawerMenuItem[] {
    return tools.map((tool: ToolBeacon) => {
      return {
        text: capitalize(tool.config.sysname),
        route: tool.config.route,
        icon: tool.config.icon,
      };
    });
  }

  render() {
    const { collapsed, toolBeacons, history, dodayAppRoute, t } = this.props;
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
            t={t}
            items={items.concat(this.toolsToDrawerMenuItems(toolBeacons))}
            renderCell={(item: DrawerMenuItem) => (
              <DodayAppMenuCell
                key={cuid()}
                collapsed={this.props.collapsed}
                item={item}
                active={item.route === dodayAppRoute}
                onClick={() => {
                  this.props.changeDodayAppRouteActionCreator(item.route);
                  history.push(item.route);
                  this.props.clearSelectedDodayActionCreator();
                }}
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
  dodayAppRoute: state.dodayApp.status.route,
  badge: state.dodayApp.status.badge,
});

export default connect(
  mapState,
  { ...actions, clearSelectedDodayActionCreator }
)(withTranslation('profile')(DrawerComponent));
