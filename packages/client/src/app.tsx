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
  AppSpot,
  configureDodayTheme,
  auth,
  APIService,
} from '@doday/lib';
import { loadModule } from './modules/loader';
import { Spot } from './modules/module-wrapper';
import { useDispatch } from 'react-redux';
import {
  getCurrentHeroActionCreator,
  setIsAuthenticatedStatusAction,
} from './modules/core/auth/src/redux';

interface AppProps {}

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

export const AppComponent = (
  props: AppProps & TranslationProps & WithTheme
) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    /**
     * Load core modules necessary to the app:
     * - Layout
     * - Authorization
     * - NavigationStack
     * - Store
     * - Profile
     */
    loadModule(ModuleSysname.Layout, ModuleType.Core);
    loadModule(ModuleSysname.Auth, ModuleType.Core);
    loadModule(ModuleSysname.Navigation, ModuleType.Core);
    loadModule(ModuleSysname.Store, ModuleType.Core);
    loadModule(ModuleSysname.Profile, ModuleType.Core);
  }, []);

  React.useEffect(() => {
    /**
     * Whenever firebase auth status changes update
     * AuthenticatedStatus and get Hero node
     */
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        return firebaseUser.getIdToken().then(async token => {
          APIService.token = token;
          APIService.getNewExp();
          dispatch(getCurrentHeroActionCreator());
          dispatch(setIsAuthenticatedStatusAction(true));
        });
      }
      dispatch(setIsAuthenticatedStatusAction(false));
    });
  }, [dispatch]);

  const theme = configureDodayTheme(props.theme);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <React.Suspense fallback={null}>
          <Spot spot={AppSpot.Default} />
        </React.Suspense>
      </div>
    </MuiThemeProvider>
  );
};

export const App = withTheme(AppComponent);
