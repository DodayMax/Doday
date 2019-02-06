import * as React from 'react';

export class Drawer extends React.Component {
  render() {
    return(
      <div className="drawer__container">
        <div className="drawer__profile">
          <div className="drawer__profile--info">
            <div className="drawer__profile--avatar"></div>
            <div className="drawer__profile--name">Ivan Smirnov</div>
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