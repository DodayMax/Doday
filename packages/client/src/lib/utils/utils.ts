import { DodayColors, ActivityTypes } from '../common-interfaces';
import { DodayTypes, DodayLike } from '../models/entities/common';
import { Activity } from '../models/entities/Activity';

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

export const activityTypeColor = (type: ActivityTypes) => {
  switch (type) {
    case 'read':
      return DodayColors.gray3;
    case 'watch':
      return DodayColors.redLight;
    default:
      return DodayColors.yellowLight;
  }
};

export function isActivity(doday: DodayLike): doday is Activity {
  return doday.type === DodayTypes.Activity;
}

export const firstItem = (arr: any[]) => arr && arr.length && arr[0];

export const youtubeIDFromURL = (url: string) => {
  const splitted = url.split('v=');
  return splitted.length > 0 ? splitted[1] : undefined;
};

export const getRandomColor = index => {
  if (index != null && index < standartColorsForGoalsChart.length) {
    return standartColorsForGoalsChart[index];
  } else {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
};

export const isEmptyObject = (obj: Object) => {
  if (!obj) return true;
  let result = true;
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'undefined') {
      result = false;
    }
  });
  return result;
};

const standartColorsForGoalsChart = [
  vars.yellow,
  vars.green,
  vars.blue,
  vars.violet,
  vars.red,
];
