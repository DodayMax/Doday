import * as React from 'react';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import { api, i18n, history } from '@services';
import '@styles/base.scss';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Shell } from '@components';
import { authStore, dodayStore, globalUIStore, builderUIStore } from '@stores';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    authStore.handleAuthentication();
  }
}

export class App extends React.Component<TranslationProps> {
  render() {
    return (
      <ApolloProvider client={api.client}>
        <I18nextProvider i18n={i18n}>
          <Provider
            globalUIStore={globalUIStore}
            authStore={authStore}
            dodaysStore={dodayStore}
            builderUIStore={builderUIStore}
          >
            <Router history={history}>
              <div>
                <Route path="/" component={Shell} />
                <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <div>Callback</div>
                }} />
              </div>
            </Router>
          </Provider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}
