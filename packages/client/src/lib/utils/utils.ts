import { DodayColor, ActivityType } from '../common-interfaces';
import { Hero } from '../models/entities/hero';
import { ToolBeacon, ProgressLike, DodayLike } from '@root/tools/types';
import { toolBeacons } from '@root/tools';

const vars = require('@styles/_config.scss');

export const detectColor: (color?: DodayColor) => string = color => {
  if (color != null) {
    switch (color) {
      case DodayColor.blue:
        return vars.blue;
      case DodayColor.blueLight:
        return vars.blueLight;
      case DodayColor.blueDark:
        return vars.blueDark;
      case DodayColor.yellow:
        return vars.yellow;
      case DodayColor.yellowLight:
        return vars.yellowLight;
      case DodayColor.yellowDark:
        return vars.yellowDark;
      case DodayColor.green:
        return vars.green;
      case DodayColor.greenLight:
        return vars.greenLight;
      case DodayColor.greenDark:
        return vars.greenDark;
      case DodayColor.violet:
        return vars.violet;
      case DodayColor.violetLight:
        return vars.violetLight;
      case DodayColor.violetDark:
        return vars.violetDark;
      case DodayColor.red:
        return vars.red;
      case DodayColor.redLight:
        return vars.redLight;
      case DodayColor.redDark:
        return vars.redDark;
      case DodayColor.gray1:
        return vars.gray1;
      case DodayColor.gray2:
        return vars.gray2;
      case DodayColor.gray3:
        return vars.gray3;
      case DodayColor.gray4:
        return vars.gray4;
      case DodayColor.gray5:
        return vars.gray5;
      case DodayColor.gray6:
        return vars.gray6;
      case DodayColor.gray7:
        return vars.gray7;
      case DodayColor.gray8:
        return vars.gray8;
      case DodayColor.gray9:
        return vars.gray9;
      case DodayColor.gray10:
        return vars.gray10;
      default:
        return undefined;
    }
  }
};

export const activityTypeColor = (type: ActivityType) => {
  switch (type) {
    default:
      return DodayColor.gray3;
  }
};

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

export const capitalize = s => s[0].toUpperCase() + s.slice(1);

export const filterObject = (obj, predicate) => {
  var result = {};
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const activeToolsForHero = (hero: Hero): ToolBeacon[] =>
  toolBeacons.filter(tool =>
    hero.tools.find(item => item === tool.config.sysname)
  );

export const isDirty = (
  initialObject: DodayLike,
  updates: Partial<ProgressLike>
): boolean =>
  !isEmptyObject(updates) &&
  (updates.dateIsLocked !==
    (initialObject.progress && initialObject.progress.dateIsLocked) ||
    updates.date != null);

const standartColorsForGoalsChart = [
  vars.yellow,
  vars.green,
  vars.blue,
  vars.violet,
  vars.red,
];
