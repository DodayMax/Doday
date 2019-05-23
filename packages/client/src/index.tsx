import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import { api, i18n, history } from '@services';
import { I18nextProvider } from 'react-i18next';
import store from '@root/store';
import 'rc-slider/assets/index.css';
import '@root/services/i18n';
import '@styles/_fonts.scss';

const Root = () => (
  <ApolloProvider client={api.client}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </I18nextProvider>
  </ApolloProvider>
);

ReactDOM.render(React.createElement(Root), document.getElementById('root'));

serviceWorker.register();
