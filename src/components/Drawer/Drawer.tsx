import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { authStore, GlobalUIStore } from '@stores';
import { inject } from 'mobx-react';
import Chart from "react-google-charts";

const styles = require('./_drawer.module.scss');

interface DrawerProps {
  globalUIStore?: GlobalUIStore;
  match?: match;
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
    return(
      <div className={styles.drawerContainer}>
        <div className={styles.drawerProfile}>
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
              Today
            </Link>
          </li>
          <li>
            <Link to={`/categories`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Categories
            </Link>
          </li>
          <li>
            <Link to={`/paths`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Chains
            </Link>
          </li>
          <li>Created by me</li>
        </ul>
        <div className={styles.drawerFooter}>
          <button>></button>
        </div>
      </div>
    );
  }
}