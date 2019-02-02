import * as React from 'react';
import Drawer from 'react-drag-drawer';
import { Grid } from '@components';
import { observable, action } from 'mobx';
import i18next from 'i18next';
import { observer, inject } from 'mobx-react';
import { AuthStore, DodayStore, GlobalUIStore, authStore, globalUIStore } from '@stores';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  authStore: AuthStore;
  dodaysStore: DodayStore;
  globalUIStore: GlobalUIStore;
}

export class Shell extends React.Component<ShellProps & TranslationProps> {
  componentDidMount() {
    this.props.authStore.showLock();
  }

  render() {
    return (
      <>
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
          onRequestClose={this.props.globalUIStore.toggleBuilder}
          modalElementClass={"modal"}
        >
          <div className="card">
            I'm in a drawer!
            <button className="toggle" onClick={this.props.globalUIStore.toggleBuilder}>
              {this.props.t!('intro')}
            </button>
          </div>
        </Drawer>
      </>
    );
  }
}

export default translate()(inject('authStore', 'dodaysStore', 'globalUIStore')(observer(Shell)));
