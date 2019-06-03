import * as moment from 'moment';
import { Hero } from '../models/entities/hero';
import { ToolBeacon } from '@root/tools/types';
import { toolBeacons } from '@root/tools';
import { config } from '@styles/config';
import { DodayLike, ProgressLike } from '../models/entities/common';

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
): boolean => {
  if (isEmptyObject(updates)) return false;
  if (
    (updates.pinned != null &&
      updates.pinned !==
        (initialObject.progress && !!initialObject.progress.pinned)) ||
    (updates.dateIsLocked != null &&
      updates.dateIsLocked !==
        (initialObject.progress && !!initialObject.progress.dateIsLocked)) ||
    (updates.date != null &&
      moment(updates.date).format('ll') !==
        (initialObject.progress &&
          moment(initialObject.progress.date).format('ll')))
  ) {
    return true;
  }
  return false;
};

const standartColorsForGoalsChart = [
  config.colors.yellow,
  config.colors.green,
  config.colors.blue,
  config.colors.violet,
  config.colors.red,
];
