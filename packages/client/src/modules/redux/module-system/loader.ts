import { i18n } from '@core/services';
import { ModuleSysname } from '@doday/lib';
import store from '@core/store';
import {
  registerModuleBySysnameActionCreator,
  registerModuleBySpotActionCreator,
  registerSpotActionCreator,
} from './module-system.actions';
import { RouteSystem } from '@core/systems';

export const loadModule = async (sysname: ModuleSysname) => {
  /** Set loading state */
  store.dispatch(
    registerModuleBySysnameActionCreator({
      status: {
        loading: true,
      },
      config: {
        sysname,
      },
    })
  );
  /** Load module */
  let loadedModule;
  try {
    await import(`@modules/${sysname}`).then(loaded => {
      loadedModule = {
        ...loaded.default,
        status: {
          loading: false,
          loaded: true,
        },
      };
      store.dispatch(registerModuleBySpotActionCreator(loadedModule));
      store.dispatch(registerModuleBySysnameActionCreator(loadedModule));
      /**
       * Register spots provided by module
       */
      if (
        loaded.default.provided &&
        loaded.default.provided.spots &&
        loaded.default.provided.spots.length
      ) {
        store.dispatch(
          registerSpotActionCreator(loaded.default.provided.routes)
        );
      }
      /**
       * Register routes provided by module
       */
      if (
        loaded.default.provided &&
        loaded.default.provided.routes &&
        loaded.default.provided.routes.length
      ) {
        RouteSystem.api().registerRoutes(loaded.default.provided.routes);
      }
    });
  } catch (err) {
    console.log(err);
    store.dispatch(
      registerModuleBySysnameActionCreator({
        status: {
          loading: false,
          loaded: false,
          error: err,
        },
        ...loadedModule.default,
      })
    );
  }

  if (!loadedModule) return undefined;

  const loadedModuleObject = loadedModule.default;
  /** Load translations for the Module */
  if (loadedModuleObject && loadedModuleObject.translations) {
    for (const lang in loadedModuleObject.translations) {
      i18n.addResourceBundle(
        lang,
        loadedModuleObject.config.sysname,
        loadedModuleObject.translations[lang],
        true,
        true
      );
    }
  }
  return loadedModuleObject;
};
