import { DodayModule, ModuleSysname, TopbarSpot } from '@doday/lib';
import { SignButtons } from './view/sign-buttons';
import { getAuthenticationModule } from '@root/modules/redux/auth';
import { en, ru } from './translations';

const SignButtonsDodayModule: DodayModule<TopbarSpot.Right> = {
  status: {},
  config: {
    sysname: ModuleSysname.SignButtons,
    spot: TopbarSpot.Right,
  },
  getView: () => ({
    component: SignButtons,
    dependencies: [getAuthenticationModule()],
  }),
  translations: {
    en,
    ru,
  },
};

export default SignButtonsDodayModule;
