import * as React from 'react';
import Drawer from 'react-drag-drawer';
import { Grid, DodayTopBar, Builder } from '@components';
import i18next from 'i18next';
import { observer, inject } from 'mobx-react';
import { AuthStore, DodayStore, GlobalUIStore, BuilderUIStore } from '@stores';

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
  render() {
    const { globalUIStore, builderUIStore, authStore } = this.props;
    console.log(authStore!.currentHero);

    return (
      <>
        <DodayTopBar coins={50} energy={8} />
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
      </>
    );
  }
}

export default translate()(inject('authStore', 'dodaysStore', 'globalUIStore', 'builderUIStore')(Shell));
