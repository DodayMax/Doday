import * as React from 'react';
import Drawer from 'react-drag-drawer';
import { Grid, DodayTopBar, Builder, Drawer as DodayDrawer } from '@components';
import i18next from 'i18next';
import { observer, inject } from 'mobx-react';
import { AuthStore, DodayStore, GlobalUIStore, BuilderUIStore, configStore } from '@stores';
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

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
}

@observer
export class Shell extends React.Component<ShellProps & TranslationProps> {
  componentDidMount() {
    configStore.fetchAllTags();
  }

  render() {
    const { globalUIStore, builderUIStore, authStore } = this.props;

    return (
      <>
        <div className="shell_container">
          <DodayTopBar coins={50} energy={8} toggle={() => globalUIStore!.toggleDrawer()} />
          <Grid />
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
        </div>
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
          <DodayDrawer />
        </Drawer>
      </>
    );
  }
}

export default translate()(inject('authStore', 'dodaysStore', 'globalUIStore', 'builderUIStore')(Shell));
