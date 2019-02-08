import * as React from 'react';
import { authStore } from '@stores';

const Doughnut = require("react-chartjs").Doughnut;

export class Drawer extends React.Component {
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
          <li>Today</li>
          <li>Paths</li>
          <li>Store</li>
        </ul>
      </div>
    );
  }
}