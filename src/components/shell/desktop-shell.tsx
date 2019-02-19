import * as React from 'react';
import { observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import * as classNames from 'classnames';
import { Drawer, DodayApp } from '@components';
import { fakeDodays } from '@lib/fake-data/dodays';

const styles = require('./_desktop-shell.module.scss');

@observer
export class DesktopShell extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <Router>
        <div className={styles.desktopContainer}>
          <nav className={styles.navBar}></nav>
          <section className={styles.contentContainer}>
            <nav>
              <Drawer collapsed={this.state.visible} toggle={() => this.toggleMenu()} />
            </nav>
            <DodayApp dodays={fakeDodays} />
            <section className={styles.mainLayout}>

            </section>
          </section>
        </div>
      </Router>
    );
  }
}
