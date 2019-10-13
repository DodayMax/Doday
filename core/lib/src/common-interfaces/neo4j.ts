import { DodayType } from '../models';

export interface Neo4jRecord {
  keys: string[];
  length: number;
  _fields: Neo4jNode;
}

export interface Neo4jNode {
  identity: Neo4jInteger;
  labels: DodayType[];
  properties: { [key: string]: string };
}

export interface Neo4jInteger {
  low: number;
  high: number;
}

export interface Neo4jDate {
  year: number;
  month: number;
  day: number;
  formatted?: string;
}

export interface Neo4jDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  millisecond?: number;
  microsecond?: number;
  nanosecond?: number;
  timezone?: string;
  formatted?: string;
}

export interface Neo4jResponseDate {
  year: {
    low: number;
    high: number;
  };
  month: {
    low: number;
    high: number;
  };
  day: {
    low: number;
    high: number;
  };
}

export interface Neo4jResponseDateTime {
  year: {
    low: number;
    high: number;
  };
  month: {
    low: number;
    high: number;
  };
  day: {
    low: number;
    high: number;
  };
  hour: {
    low: number;
    high: number;
  };
  minute: {
    low: number;
    high: number;
  };
  second?: {
    low: number;
    high: number;
  };
  nanosecond?: {
    low: number;
    high: number;
  };
  timeZoneId?: string;
  timeZoneOffsetSeconds?: {
    low: number;
    high: number;
  };
}
