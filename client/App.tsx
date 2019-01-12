import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import client from './graphs/client';
import { createHeroNode, createDodayNode, addHeroDodays } from './graphs/mutations';
import { authStore, dodayStore } from './stores';
import Grid from './components/grid/Grid';
import 'firebase/auth';
import './styles/base.scss'

@observer
class App extends React.Component {
  componentDidMount() {
    authStore.listenAuthChange();
  }

  signInAnonymously = () => {
    authStore.loginAnonymously()
      .then((user) => {
        createHeroNode({ variables: { id: user.user!.uid, name: 'Unknown Dodayer', created: Date.now() } });
      })
  }

  loginAnonymously = () => {
    return (
      <button onClick={() => this.signInAnonymously}>Login Anonymously</button>
    )
  }

  addDodayNodeButton = () => {
    return (
      <div>
        <input />
        <button
          onClick={async () => {
            dodayStore.createDodayNode();
          }}
        >
          Add doday node
        </button>
      </div>
    )
  }

  renderContent = () => {
    if (authStore.currentHero === undefined) {
      return <div>Loading...</div>
    } else if (authStore.currentHero === null) {
      return this.loginAnonymously();
    } else {
      return (
        <>
          <Grid />
          <div className="control_panel">
            {this.addDodayNodeButton()}
          </div>
        </>
      );
    }
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
