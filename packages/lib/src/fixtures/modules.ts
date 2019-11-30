import { DodayModule, ModuleSysname } from '../systems';

export const fakeDodayModule: DodayModule = {
  status: {
    loading: false,
    loaded: true,
  },
  config: {
    sysname: ModuleSysname.Auth,
  },
};
