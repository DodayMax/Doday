import * as React from 'react';
import { Route } from 'react-router-dom';
import { Drawer, DodayApp, Builder } from '@components';

const css = require('./_dashboard.module.scss');

interface DashboardProps {
  toggleDrawer: () => void;
  isDrawerShown: boolean;
}

export class Dashboard extends React.Component<DashboardProps> {
  toggleMenu() {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <>
        <nav>
          <Drawer
            collapsed={this.props.isDrawerShown}
            toggle={() => this.toggleMenu()}
          />
        </nav>
        <DodayApp />
        <section className={css.mainLayout}>
          <Route exact path="/" render={() => <div>Store</div>} />
          <Route path="/dodays/:id" render={() => <div>Doday details</div>} />
          <Route path="/builder" component={Builder} />
        </section>
      </>
    );
  }
}
