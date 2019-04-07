import { DodayColors } from '../common-interfaces';

const vars = require('@styles/_config.scss');

export const detectColor: (color?: DodayColors) => string = color => {
  if (color != null) {
    switch (color) {
      case DodayColors.blue:
        return vars.blue;
      case DodayColors.blueLight:
        return vars.blueLight;
      case DodayColors.blueDark:
        return vars.blueDark;
      case DodayColors.yellow:
        return vars.yellow;
      case DodayColors.yellowLight:
        return vars.yellowLight;
      case DodayColors.yellowDark:
        return vars.yellowDark;
      case DodayColors.green:
        return vars.green;
      case DodayColors.greenLight:
        return vars.greenLight;
      case DodayColors.greenDark:
        return vars.greenDark;
      case DodayColors.violet:
        return vars.violet;
      case DodayColors.violetLight:
        return vars.violetLight;
      case DodayColors.violetDark:
        return vars.violetDark;
      case DodayColors.red:
        return vars.red;
      case DodayColors.redLight:
        return vars.redLight;
      case DodayColors.redDark:
        return vars.redDark;
      case DodayColors.gray1:
        return vars.gray1;
      case DodayColors.gray2:
        return vars.gray2;
      case DodayColors.gray3:
        return vars.gray3;
      case DodayColors.gray4:
        return vars.gray4;
      case DodayColors.gray5:
        return vars.gray5;
      case DodayColors.gray6:
        return vars.gray6;
      case DodayColors.gray7:
        return vars.gray7;
      case DodayColors.gray8:
        return vars.gray8;
      case DodayColors.gray9:
        return vars.gray9;
      case DodayColors.gray10:
        return vars.gray10;
      default:
        return undefined;
    }
  }
};