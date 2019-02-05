import * as React from 'react';
import Drawer from 'react-drag-drawer';
import { Grid, DodayTopBar, Builder } from '@components';
import { api } from '@services';
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
  async componentDidMount() {
    const req = await api.heroes.queries.getHeroByID({ id: "1" });
    console.log(req);
  }

  render() {
    const { globalUIStore, builderUIStore, authStore } = this.props;
    return (
      <>
        <DodayTopBar coins={50} energy={8} />
        <Grid />
        <button
          className="control_button"
          onClick={() => {
            //globalUIStore!.toggleBuilder()
            authStore!.login();
            // if (this.inputValue) {
            //   dodayStore.createDodayNode(this.inputValue);
            //   this.inputValue = "";
            // }
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
