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
