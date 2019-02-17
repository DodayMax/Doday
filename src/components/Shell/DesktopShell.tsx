import * as React from 'react';
import { observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import * as classNames from 'classnames';
import { Drawer } from '@components';

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
    const className = classNames({
      [styles['drawer']]: true,
      [styles['drawer-visible']]: this.state.visible,
    });
    return (
      <Router>
        <div className={styles.desktopContainer}>
          <nav className={styles.navBar}>
            <button onClick={() => this.toggleMenu()} className={styles.toggleMenu}>=</button>
          </nav>
          <section className={styles.contentContainer}>
            <nav className={className}>
              <Drawer />
            </nav>
            <section className={styles.mainLayout}>

            </section>
          </section>
        </div>
      </Router>
    );
  }
}

export default Shell;
