import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import Drawer from 'react-drag-drawer';
import { api } from '@services';
import { authStore } from '@stores';
import { Grid } from '@components';
import { observable, action } from 'mobx';
import i18next from 'i18next';
import { observer } from 'mobx-react';

const { translate } = require('react-i18next');

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

@translate()
@observer
export class Shell extends React.Component<TranslationProps> {
  @observable private inputValue: string = "";
  @observable private isDrawerShown = false;

  componentDidMount() {
    authStore.showLock();
  }

  setInputValue = (value: string) => {
    this.inputValue = value;
  }

  @action
  toggle = () => {
    this.isDrawerShown = !this.isDrawerShown
  }

  addDodayNodeButton = () => {
    return (
      <>
        <button
          className="control_button"
          onClick={async () => {
            this.toggle();
            // if (this.inputValue) {
            //   dodayStore.createDodayNode(this.inputValue);
            //   this.inputValue = "";
            // }
          }}
        ></button>
      </>
    )
  }

  render() {
    return (
      <ApolloProvider client={api.client}>
        <Grid />
        {this.addDodayNodeButton()}
        <Drawer
          open={this.isDrawerShown}
          onRequestClose={this.toggle}
          modalElementClass={"modal"}
        >
          <div className="card">
            I'm in a drawer!
            <input
              className="control_input"
              onChange={(e: any) => this.setInputValue(e.target.value)}
              value={this.inputValue || ""}
              placeholder="Create doday here"
            />
            <button className="toggle" onClick={this.toggle}>
              {this.props.t!('intro')}
            </button>
          </div>
        </Drawer>
      </ApolloProvider>
    );
  }
}
