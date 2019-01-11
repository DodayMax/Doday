import * as React from 'react';
import { observer } from 'mobx-react';
import * as firebase from 'firebase/app';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import gql from "graphql-tag";
import { dodayStore, Doday } from './stores/doday-store';
import 'firebase/auth';
import './App.scss';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

client
  .query({
    query: gql`
      {
        Hero(id: 1) {
          name
        }
      }
    `
  })
  .then(result => console.log(result));

@observer
class App extends React.Component {
  componentDidMount() {
    if (!firebase.auth().currentUser) {
      firebase.auth().signInAnonymously()
        .then(() => {
          
        })
        .catch(function (error) {
          // Handle Errors here.
        });
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          {dodayStore.dodays.map((doday: Doday) => (<li key={doday.id} onClick={() => dodayStore.toggleDoday(doday.id)}>{doday.title} | {`${doday.completed}`}</li>))}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
