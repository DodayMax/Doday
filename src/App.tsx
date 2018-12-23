import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
