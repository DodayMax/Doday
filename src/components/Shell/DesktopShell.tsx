import * as React from 'react';
import { observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Drawer, Canvas } from '@components';

const styles = require('./_desktopShell.module.scss');

@observer
export class Shell extends React.Component<any, any> {
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
    const classes = `${styles.drawer} ${this.state.visible ? styles.drawerVisible : ''}`;
    return (
      <Router>
        <div className={styles.desktopContainer}>
          <nav className={classes}>
            <Drawer />
          </nav>
          <section className={styles.mainLayout}>
            <nav className={styles.navBar}>
              <button onClick={() => this.toggleMenu()} className={styles.toggleMenu}>=</button>
            </nav>
            <Canvas />
          </section>
        </div>
      </Router>
    );
  }
}

export default Shell;
