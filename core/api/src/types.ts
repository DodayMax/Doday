import { DodayType } from '@doday/lib';

export type DodaysQueryParams = {
  /** filter by DodayType */
  dodaytype?: DodayType;
  /** filter by Hero created doday */
  createdBy?: string;
  /** Skip some amount of results - paging */
  skip?: number;
  /** Limit results count - paging */
  limit?: number;
  /** Search term */
  term?: string;
};

export type DodaysWithProgressQueryParams = {
  /** filter by DodayType */
  dodaytype?: DodayType;
  /** fetch dodays <= endOf(exactDate) */
  exactDate?: number;
  /** fetch dodays for whole day (>= startOf(date) AND <= endOf(date)) */
  date?: number;
  /** >= startdate */
  startdate?: number;
  /** <= enddate */
  enddate?: number;
  /** filter by completion */
  completed?: boolean;
  /** filter by Hero created doday */
  createdBy?: string;
};
