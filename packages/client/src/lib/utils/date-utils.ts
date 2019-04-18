import { Neo4jDateTime, Neo4jDate } from '@lib/common-interfaces';
import { Neo4jResponseDate } from '../common-interfaces/neo4j';

export const neo4jDateTimeFromDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export const dateFromNeo4jDateTime = (datetime: Neo4jDateTime) => {
  const date = new Date();
  date.setFullYear(datetime.year);
  date.setMonth(datetime.month - 1);
  date.setDate(datetime.day);
  date.setHours(datetime.hour);
  date.setMinutes(datetime.minute);
  date.setSeconds(datetime.second || 0);
  date.setMilliseconds(datetime.millisecond || 0);

  return date;
};

export const neo4jDateFromDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const dateFromNeo4jDate = (date: Neo4jDate) => {
  const newDate = new Date();
  newDate.setFullYear(date.year);
  newDate.setMonth(date.month - 1);
  newDate.setDate(date.day);

  return newDate;
};

export const neo4jResponseDateToJSDate = (date: Neo4jResponseDate) =>
  new Date(`${date.year.low}-${date.month.low}-${date.day.low}`);

export const dateInputStringFromDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const durationToLabel = (duration: string) => {
  const totalMinutes = Number(duration.slice(2, -1));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const durationToMinutes = (duration: string) =>
  Number(duration.slice(2, -1));
