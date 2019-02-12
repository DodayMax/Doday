import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, match } from 'react-router-dom';
import i18next from 'i18next';
import Drawer from 'react-drag-drawer';
import { AuthStore, DodayStore, GlobalUIStore, BuilderUIStore, configStore } from '@stores';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  authStore?: AuthStore;
  dodaysStore?: DodayStore;
  globalUIStore?: GlobalUIStore;
  builderUIStore?: BuilderUIStore;
  match?: match;
}

import { Grid, Builder, Drawer as DodayDrawer } from '@components';

@observer
export class MobileShell extends React.Component<ShellProps & TranslationProps> {
  componentDidMount() {
    configStore.fetchAllTags();
  }

  render() {
    const { authStore, globalUIStore, builderUIStore } = this.props;

    return (
      <>
        <Route exact path={`/`} component={Grid} />
        <Route path={`/paths`} render={() => <div>Paths</div>} />
        <Route path={`/store`} render={() => <div>Store</div>} />
        <button
          className="control_button"
          onClick={() => {
            if (authStore!.currentHero) {
              globalUIStore!.toggleBuilder()
            } else {
              authStore!.login();
            }
          }}
        ></button>
        <button className="drawer_button" onClick={() => globalUIStore!.toggleDrawer()}>=</button>
        <Drawer
          open={globalUIStore!.isBuilderShown}
          onRequestClose={() => {
            globalUIStore!.toggleBuilder();
            builderUIStore!.clear();
          }}
          modalElementClass={"modal"}
        >
          <Builder
            builderUIStore={builderUIStore}
          />
        </Drawer>
        <Drawer
          open={globalUIStore!.isDrawerShown}
          direction='left'
          onRequestClose={() => {
            globalUIStore!.toggleDrawer();
          }}
          modalElementClass={"sidebar"}
        >
          <Route path="/" component={DodayDrawer} />
        </Drawer>
      </>
    );
  }
}

export default translate()(inject('authStore', 'dodaysStore', 'globalUIStore', 'builderUIStore')(MobileShell));