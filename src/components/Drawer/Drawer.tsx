import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { authStore, GlobalUIStore } from '@stores';
import { inject } from 'mobx-react';
import Chart from "react-google-charts";

const styles = require('./_drawer.module.scss');

interface DrawerProps {
  globalUIStore?: GlobalUIStore;
  match?: match;
  collapsed: boolean;
  toggle: () => void;
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

@inject('globalUIStore')
export class Drawer extends React.Component<DrawerProps> {
  render() {
    const { collapsed, toggle } = this.props;

    if (collapsed) {
      return (
        <div className={styles.drawerContainerCollapsed}>
          <div className={styles.drawerProfileContainerCollapsed}>
            <div className={styles.drawerProfileAvatarCollapsed}></div>
          </div>
          <div className={styles.drawerLevel}>1</div>
          <ul role="navigation" className={styles.drawerMenuCollapsed}>
            <li>
              <Link to={`/`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
                icon1
            </Link>
            </li>
            <li>
              <Link to={`/paths`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
                icon2
            </Link>
            </li>
            <li>
              <Link to={`/categories`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
                icon3
            </Link>
            </li>
            <li>icon4</li>
          </ul>
          <div className={styles.drawerFooter}>
            <button className={styles.drawerToggleButton} onClick={toggle}>{'>'}</button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.drawerContainer}>
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
        <div className={styles.drawerLevel}>
          1 Level, Novice
        </div>
        <ul role="navigation" className={styles.drawerMenu}>
          <li>
            <Link to={`/`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Dodays
            </Link>
          </li>
          <li>
            <Link to={`/paths`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Paths
            </Link>
          </li>
          <li>
            <Link to={`/categories`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Categories
            </Link>
          </li>
          <li>Created by me</li>
        </ul>
        <div className={styles.drawerFooter}>
          <button className={styles.drawerToggleButton} onClick={toggle}>{'<'}</button>
        </div>
      </div>
    );
  }
}