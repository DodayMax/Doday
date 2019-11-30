import * as React from 'react';
import {
  MuiThemeProvider,
  WithTheme,
  withTheme,
} from '@material-ui/core/styles';
import { TFunction, i18n } from 'i18next';
import { AppSpot, configureDodayTheme, auth, APIService } from '@doday/lib';
import { useDispatch, useSelector } from 'react-redux';
import { ACLGuard } from './components/acl-guard/acl-guard';
import {
  heroSelector,
  getCurrentHeroActionCreator,
  setIsAuthenticatedStatusAction,
} from '@redux/auth';
import { loadModulesActionCreator } from '@redux/module-system';
import { Spot } from './components/spot/spot';
import { modules } from './modules/init';

interface AppProps {}

interface TranslationProps {
  t?: TFunction;
  i18n?: i18n;
}

export const AppComponent = (
  props: AppProps & TranslationProps & WithTheme
) => {
  const dispatch = useDispatch();
  const activeHeroModules = useSelector(heroSelector);

  React.useEffect(() => {
    /**
     * Load core modules necessary to the app:
     * - Layout
     * - Authorization
     * - Navigation module
     * - Toast
     * - Dialog
     */
    dispatch(
      loadModulesActionCreator([...modules.map(item => item.doday.sysname)])
    );
  }, []);

  React.useEffect(() => {
    /**
     * Load active Hero's modules
     */
    if (
      activeHeroModules &&
      activeHeroModules.activeModules &&
      activeHeroModules.activeModules.length
    ) {
      dispatch(
        loadModulesActionCreator([
          ...activeHeroModules.activeModules.map(
            entity => entity.doday.sysname
          ),
        ])
      );
    }
  }, [activeHeroModules]);

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
          <ACLGuard
            allowed={<Spot sysname={AppSpot.Default} />}
            forbidden={null}
          />
        </React.Suspense>
      </div>
      <Spot sysname={AppSpot.Toast} />
      <Spot sysname={AppSpot.Dialog} />
    </MuiThemeProvider>
  );
};

export const App = withTheme(AppComponent);
