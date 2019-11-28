import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { i18n } from '@root/core/services';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import { history } from '@root/core/services';
import { I18nextProvider } from 'react-i18next';
import store from '@root/core/store';
import 'rc-slider/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/starter.scss';
import '@styles/_fonts.scss';
import '@styles/_animations.scss';

const Root = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </I18nextProvider>
);

ReactDOM.render(React.createElement(Root), document.getElementById('root'));

serviceWorker.register();
