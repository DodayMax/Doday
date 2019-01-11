import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import App from './client/App';
import * as serviceWorker from './serviceWorker';

var config = {
  apiKey: "AIzaSyCn_YyozaC8EeTjzKDqAiKKZCg83yIL4VE",
  authDomain: "doday-web.firebaseapp.com",
  databaseURL: "https://doday-web.firebaseio.com",
  projectId: "doday-web",
  storageBucket: "doday-web.appspot.com",
  messagingSenderId: "813194598026"
};
firebase.initializeApp(config);

ReactDOM.render(React.createElement(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
