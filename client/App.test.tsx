import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';

it('renders without crashing', () => {
  var config = {
    apiKey: "AIzaSyCn_YyozaC8EeTjzKDqAiKKZCg83yIL4VE",
    authDomain: "doday-web.firebaseapp.com",
    databaseURL: "https://doday-web.firebaseio.com",
    projectId: "doday-web",
    storageBucket: "doday-web.appspot.com",
    messagingSenderId: "813194598026"
  };
  firebase.initializeApp(config);
  
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
