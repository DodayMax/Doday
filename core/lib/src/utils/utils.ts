import * as moment from 'moment';
import { DodayLike, ProgressLike } from '../models/entities/common';
import { config } from '../dms';

export const firstItem = (arr: any[]) => arr && arr.length && arr[0];

export const youtubeIDFromURL = (url?: string) => {
  if (!url) return;
  const splitted = url.split('v=');
  return splitted.length > 0 ? splitted[1] : undefined;
};

export const getRandomColor = (index: number) => {
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

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const filterObject = (
  obj: object,
  predicate: (value: any) => boolean
) => {
  var result = {};
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};

// export const activeToolsForHero = (hero: Hero): ToolBeacon[] | undefined => {
//   if (!hero) return;
//   return toolBeacons.filter(tool =>
//     hero.tools.find(item => item === tool.config.sysname)
//   );
// };

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
