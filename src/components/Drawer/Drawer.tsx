import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { authStore, GlobalUIStore } from '@stores';
import { inject } from 'mobx-react';

const Doughnut = require("react-chartjs").Doughnut;

interface DrawerProps {
  globalUIStore: GlobalUIStore;
  match?: match;
}

@inject('globalUIStore')
export class Drawer extends React.Component<DrawerProps> {
  render() {
    return(
      <div className="drawer__container">
        <div className="drawer__profile">
          <div>
            <Doughnut
              data={authStore.tagsForChart}
              options={{
                showScale: false,
                animateRotate: false,
                segmentStrokeColor: "rgba(255,255,255,0.6)",
                scaleShowLabelBackdrop: false,
                scaleBackdropColor: "rgba(0,0,0,0)",
                scaleShowLine: false,
              }}
              width="150"
              height="150"
            />
          </div>
        </div>
        <div className="drawer__level">
          1 Level, Novice
        </div>
        <ul className="drawer__menu">
          <li>
            <Link to={`/`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Today
            </Link>
          </li>
          <li>
            <Link to={`/paths`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Paths
            </Link>
          </li>
          <li>
            <Link to={`/store`} onClick={() => this.props.globalUIStore!.toggleDrawer()}>
              Store
            </Link>
          </li>
          <li>Created dodays</li>
          <li>Created paths</li>
        </ul>
      </div>
    );
  }
}