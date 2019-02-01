import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import client from './graphs/client';
import { dodayStore } from './stores';
import Grid from './components/grid/Grid';
import './styles/base.scss';
import { observable } from 'mobx';

@observer
class App extends React.Component {
  @observable private inputValue: string = "";

  setInputValue = (value: string) => {
    this.inputValue = value;
  }

  addDodayNodeButton = () => {
    return (
      <>
        <input
          className="control_input"
          onChange={(e: any) => this.setInputValue(e.target.value)}
          value={this.inputValue || ""}
          placeholder="Create doday here"
        />
        <button
          className="control_button"
          onClick={async () => {
            if (this.inputValue) {
              dodayStore.createDodayNode(this.inputValue);
              this.inputValue = "";
            }
          }}
        >
          Add doday node
        </button>
      </>
    )
  }

  renderContent = () => {
    return (
      <>
        <Grid />
        <div className="control_panel">
          {this.addDodayNodeButton()}
        </div>
      </>
    );
  }

  render() {
    return (
      <ApolloProvider client={client}>
        { this.renderContent() }
      </ApolloProvider>
    );
  }
}

export default App;
