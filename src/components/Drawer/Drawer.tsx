import * as React from 'react';

var data = [
  {
    value: 10,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
  },
  {
    value: 1,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
  },
  {
    value: 1,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow"
  },
  {
    value: 1,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey"
  },
  {
    value: 1,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey"
  }

];

const PolarChart = require("react-chartjs").PolarArea;

export class Drawer extends React.Component {
  render() {
    return(
      <div className="drawer__container">
        <div className="drawer__profile">
          <div>
            <PolarChart
              data={data}
              options={{
                showScale: false,
                segmentStrokeColor: "rgba(255,255,255,0.6)",
                scaleShowLabelBackdrop: false,
                scaleBackdropColor: "rgba(0,0,0,0)",
                scaleShowLine: false,
              }}
              width="200"
              height="200"
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