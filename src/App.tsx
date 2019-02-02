import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import Drawer from 'react-drag-drawer';
import { client } from '@api';
import { authStore } from '@stores';
import { Grid } from '@components';
import './styles/base.scss';
import { observable, action } from 'mobx';

@observer
class App extends React.Component {
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
      <ApolloProvider client={client}>
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
              Close drawer
            </button>
          </div>
        </Drawer>
      </ApolloProvider>
    );
  }
}

export default App;
