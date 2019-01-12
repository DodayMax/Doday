import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import client from './graphs/client';
import { createHeroNode, createDodayNode, addHeroDodays } from './graphs/mutations';
import { authStore, dodayStore } from './stores';
import Grid from './components/grid/Grid';
import 'firebase/auth';

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
      <button
        onClick={async () => {
          const { data }: any = await createDodayNode({ name: `${Math.random()} doday`, created: Date.now() });
          await addHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id: data!.CreateDoday.id } });
          await dodayStore.fetchActiveDodays();
        }}
      >
        Add doday node
      </button>
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
          {this.addDodayNodeButton()}
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
