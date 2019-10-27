import { i18n } from '@services';
import { ModuleType, ModuleSysname } from '@doday/lib';
import store from '@root/store';
import { addModuleActionCreator } from './redux/ms';

export const loadModule = async (sysname: ModuleSysname, type: ModuleType) => {
  /** Set loading state */
  store.dispatch(
    addModuleActionCreator({
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
    await import(`@modules/${type}/${sysname}`).then(loaded => {
      loadedModule = loaded;
      store.dispatch(
        addModuleActionCreator({
          ...loadedModule.default,
          status: {
            loading: false,
            loaded: true,
          },
        })
      );
    });
  } catch (err) {
    console.log(err);
    store.dispatch(
      addModuleActionCreator({
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
  console.log(i18n);
  return loadedModuleObject;
};
