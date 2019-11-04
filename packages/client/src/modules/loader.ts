import { i18n } from '@services';
import {
  ModuleType,
  ModuleSysname,
  ModuleObject,
  DodayRoutes,
} from '@doday/lib';
import store from '@root/store';
import {
  addModuleActionCreator,
  addEntitiesActionCreator,
} from './core/ms/src/redux';

export const loadModule = async (sysname: ModuleSysname, type: ModuleType) => {
  /** Set loading state */
  store.dispatch(
    addModuleActionCreator({
      module: {
        status: {
          loading: true,
        },
        config: {
          sysname,
          type,
        },
      },
      type,
    })
  );
  /** Load module */
  let loadedModule;
  try {
    await import(`@modules/${type}/${sysname}`).then(loaded => {
      loadedModule = loaded;
      store.dispatch(
        addModuleActionCreator({
          module: {
            ...loadedModule.default,
            status: {
              loading: false,
              loaded: true,
            },
          },
          type,
        })
      );
      /**
       * Add entities provided by module
       */
      if (loaded.default.entities && loaded.default.entities.length) {
        store.dispatch(addEntitiesActionCreator(loaded.default.entities));
      }
      /**
       * Register routes provided by module
       */
      if (loaded.default.routes && loaded.default.routes.length) {
        DodayRoutes.registerRoutes(loaded.default.routes);
      }
    });
  } catch (err) {
    console.log(err);
    store.dispatch(
      addModuleActionCreator({
        module: {
          status: {
            loading: false,
            loaded: false,
            error: err,
          },
          ...loadedModule.default,
        },
        type,
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
