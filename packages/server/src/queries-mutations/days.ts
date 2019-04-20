import { v1 as neo4j } from 'neo4j-driver';
import { isToday, endDay } from '../util/date-utils';

export const getDayInfoQuery = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    date: number;
  }
) => {
  return tx.run(
    `
      MATCH (h:Hero)-[]-(p:Progress)-[]-(d:Doday)
      WHERE h.did = $heroDID
      AND p.date ${isToday(new Date(props.date)) ? '<=' : '='} datetime($date)
      AND p.completed = false
      AND p.dateIsLocked in CASE WHEN p.date >= datetime($date) THEN [false] ELSE [true, false] END

      WITH  collect(d) as otherDodays

      OPTIONAL MATCH (h:Hero)-[]-(p:Progress)-[]-(d:Doday)
      WHERE h.did = $heroDID
      AND p.date ${isToday(new Date(props.date)) ? '<=' : '='} datetime($date)
      AND p.completed = false
      AND p.dateIsLocked = true

      WITH otherDodays, CASE WHEN d.duration IS NULL THEN 0 ELSE sum(duration(d.duration)).minutes END as selectedDodaysDuration

      RETURN otherDodays, selectedDodaysDuration
    `,
    {
      heroDID: props.heroDID,
      date: endDay(new Date(props.date)).toISOString(),
    }
  );
};
