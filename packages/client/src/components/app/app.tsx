import * as React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import { api, i18n, history } from '@services';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import Media from 'react-media';
import { Shell, DesktopShell } from '@components';
import store from '@root/store';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '@styles/_fonts.scss';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

export class App extends React.Component<TranslationProps> {
  render() {
    return (
      <ApolloProvider client={api.client}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Router history={history}>
              <div className="app-container">
                <Media query="(max-width: 767px)">
                  {matches =>
                    matches ? (
                      <Route path="/" component={Shell} />
                    ) : (
                      <Route path="/" component={DesktopShell} />
                    )
                  }
                </Media>
              </div>
            </Router>
          </Provider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}
