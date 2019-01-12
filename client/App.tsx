import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { Mutation } from "react-apollo";
import client from './graphs/client';
import { CREATE_HERO } from './graphs/mutations';
import { dodayStore, Doday, authStore } from './stores';
import 'firebase/auth';
import './App.scss';

@observer
class App extends React.Component {
  componentDidMount() {
    authStore.listenAuthChange();
  }

  signInAnonymously = (callback: any) => {
    authStore.loginAnonymously()
      .then((user) => {
        callback({ variables: { id: user.user!.uid, name: 'Unknown Dodayer', created: Date.now() } });
      })
  }

  loginAnonymously = () => {
    return (
      <Mutation mutation={CREATE_HERO}>
        {(CreateHero, { data }) => (
          <button
            onClick={() => {
              this.signInAnonymously(CreateHero)
            }}
          >Login Anonymously</button>
        )}
      </Mutation>
    )
  }

  renderContent = () => {
    if (authStore.currentHero === undefined) {
      return <div>Loading...</div>
    } else if (authStore.currentHero === null) {
      return this.loginAnonymously();
    } else {
      return <div className="App">
        {dodayStore.dodays.map((doday: Doday) => (<li key={doday.id} onClick={() => dodayStore.toggleDoday(doday.id)}>{doday.title} | {`${doday.completed}`}</li>))}
      </div>;
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
