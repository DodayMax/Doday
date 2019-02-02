import * as React from 'react';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { api, i18n } from '@services';
import '@styles/base.scss';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Shell } from '@components';
import { authStore, dodayStore, globalUIStore, builderStore } from '@stores';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
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
            builderStore={builderStore}
          >
            <Shell />
          </Provider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}
