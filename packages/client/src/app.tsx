import * as React from 'react';
import {
  MuiThemeProvider,
  WithTheme,
  withTheme,
} from '@material-ui/core/styles';
import i18next from 'i18next';
import {
  ModuleSysname,
  ModuleType,
  RootState,
  configureDodayTheme,
} from '@doday/lib';
import { useSelector } from 'react-redux';
import { loadModule } from './modules/loader';
import { ModuleWrapper } from './modules/module-wrapper';

interface AppProps {}

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

export const AppComponent = (
  props: AppProps & TranslationProps & WithTheme
) => {
  React.useEffect(() => {
    /**
     * Load core modules necessary to the app
     * Layout
     * Authorization
     * NavigationStack
     */
    loadModule(ModuleSysname.layout, ModuleType.core);
  }, []);

  const layoutModule = useSelector(
    (state: RootState) => state.ms.modules[ModuleSysname.layout]
  );

  const theme = configureDodayTheme(props.theme);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <React.Suspense fallback={null}>
          <ModuleWrapper moduleObject={layoutModule} />
        </React.Suspense>
      </div>
    </MuiThemeProvider>
  );
};

export const App = withTheme(AppComponent);
