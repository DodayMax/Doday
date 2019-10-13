import { i18n } from '@services';

export const loadTool = async (path: string) => {
  /** Load Tool module */
  const loadedToolModule = await import(`@tools/${path}`);
  const loadedTool = loadedToolModule.default;
  /** Load translations for the Tool */
  if (loadedTool && loadedTool.translations) {
    for (const lang in loadedTool.translations) {
      i18n.addResourceBundle(
        lang,
        loadedTool.config.sysname,
        loadedTool.translations[lang],
        true,
        true
      );
    }
  }
  return loadedToolModule;
};
