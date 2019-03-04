import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, match } from 'react-router-dom';
import Chart from "react-google-charts";
import { Grid, Icons, ClickableIcon } from '@components';
import { actions } from '@ducks/doday-app';
import { dodayApp } from '@lib/constants';
import { RootState } from '@root/lib/models';

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

interface PropsFromConnect {
  badge: number;
}

interface Actions {
  changePath: (path: string) => void;
}

const data = [
  ["Task", "Hours per Day"],
  ["Evolution", 7],
  ["Family", 2],
  ["Money", 2],
  ["Health", 3],
  ["Career", 11],
  ["Hobby", 2],
];

const options = {
  backgroundColor: { fill: 'transparent' } as any,
  pieHole: 0.4,
  is3D: false,
  legend: 'none',
  pieSliceText: 'label',
};

export class DrawerComponent extends React.Component<DrawerProps & PropsFromConnect & Actions> {
  renderDrawerProfileSection = () => {
    if (this.props.collapsed) {
      return (
        <div className={styles.drawerProfileContainerCollapsed}>
          <div className={styles.drawerProfileAvatarCollapsed}></div>
        </div>
      );
    } else {
      return (
        <div className={styles.drawerProfileContainer}>
          <div>
            <Chart
              chartType="PieChart"
              width="28rem"
              height="28rem"
              data={data}
              options={options}
            />
          </div>
        </div>
      );
    }
  }

  renderDrawerLevel = () => {
    if (this.props.collapsed) {
      return <div className={styles.drawerLevel}>1</div>;
    } else {
      return (
        <div className={styles.drawerLevel}>
          1 Level, Novice
        </div>
      );
    }
  }

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
  }

  render() {
    const { collapsed, badge } = this.props;
    const classNames = classnames({
      [styles.drawerContainerCollapsed]: collapsed,
      [styles.drawerContainer]: !collapsed,
    });

    return (
      <div className={classNames}>
        { this.renderDrawerProfileSection() }
        { this.renderDrawerLevel() }
        <ul role="navigation" className={styles.drawerMenu}>
          <Grid
            items={[
              {
                text: 'Today',
                icon: 'TodayCalendar',
                action: 'changePath',
                payload: '',
                badge,
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
              }
            ]}
            cellType="DodayAppMenuCell"
            collapsed={collapsed}
          />
        </ul>
        { this.renderDrawerFooterIcon() }
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  badge: state.dodayApp.badge,
});

export default connect(mapState, { ...actions })(DrawerComponent);