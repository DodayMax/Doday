import * as React from 'react';
import Drawer from 'react-drag-drawer';
import { Grid, DodayTopBar, Builder } from '@components';
import i18next from 'i18next';
import { observer, inject } from 'mobx-react';
import { AuthStore, DodayStore, GlobalUIStore, BuilderStore, builderStore } from '@stores';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  authStore: AuthStore;
  dodaysStore: DodayStore;
  globalUIStore: GlobalUIStore;
  builderStore: BuilderStore;
}

@observer
export class Shell extends React.Component<ShellProps & TranslationProps> {
  componentDidMount() {
    //this.props.authStore.showLock();
  }

  render() {
    return (
      <>
        <DodayTopBar coins={50} energy={8} />
        <Grid />
        <button
          className="control_button"
          onClick={() => {
            this.props.globalUIStore.toggleBuilder()
            // if (this.inputValue) {
            //   dodayStore.createDodayNode(this.inputValue);
            //   this.inputValue = "";
            // }
          }}
        ></button>
        <Drawer
          open={this.props.globalUIStore.isBuilderShown}
          onRequestClose={() => {
            this.props.globalUIStore.toggleBuilder();
            this.props.builderStore.clearSelectedType();
          }}
          modalElementClass={"modal"}
        >
          <Builder
            dodayTypes={builderStore!.dodayTypes}
            selectDodayType={(type: string) => builderStore!.selectDodayType(type)}
            selectedDodayType={builderStore!.selectedDodayType}
          />
        </Drawer>
      </>
    );
  }
}

export default translate()(inject('authStore', 'dodaysStore', 'globalUIStore', 'builderStore')(Shell));
