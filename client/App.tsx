import * as React from 'react';
import { observer } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import client from './graphs/client';
import { dodayStore, Doday, authStore } from './stores';
import 'firebase/auth';
import './App.scss';

@observer
class App extends React.Component {
  componentDidMount() {
    authStore.listenAuthChange();
  }

  renderContent = () => {
    if (authStore.currentHero === undefined) {
      return <div>Loading...</div>
    } else if (authStore.currentHero === null) {
      return <button onClick={() => authStore.loginAnonymously()}>Login Anonymously</button>;
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
