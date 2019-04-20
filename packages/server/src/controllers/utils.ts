import { driver } from '../config/neo4j-driver';
const fetch = require('node-fetch');
const { getMetadata } = require('page-metadata-parser');
const domino = require('domino');
import { Request, Response } from 'express';
import { getDayInfoQuery } from '../queries-mutations/days';
import { firstItem } from '../util/utils';
import { durationToMinutes } from '../util/date-utils';
import { multyUpdateDodaysTransaction } from '../queries-mutations/dodays';

/**
 * Parse url metadata
 */
export let parseUrlMetadata = (req: Request, res: Response) => {
  const metadata = parseURL(req.query.url);
  metadata
    .then(value => res.status(200).send(value))
    .catch(e => res.status(404).send(e));
};

async function parseURL(url) {
  const response = await fetch(url);
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  return await getMetadata(doc, url);
}

/**
 * Plan out dodays from start date =>
 */
export const planout = async (req: Request, res: Response) => {
  const session = driver.session();

  let startDate = Number(req.query.date);
  let replannedDodays = [];

  const dayInfo = async date =>
    await session.writeTransaction(tx =>
      getDayInfoQuery(tx, {
        heroDID: req.user.did,
        date,
      })
    );

  const parseDayInfoResponse = res => {
    const record = firstItem(res.records);
    const otherDodays =
      record._fields &&
      record._fields.length &&
      record._fields[0].map(node => node.properties);
    const selectedDuration =
      record._fields && record._fields.length > 1 && record._fields[1].low;

    return {
      otherDodays,
      selectedDuration,
    };
  };

  const findDodayToFit = (dodays, freeTime) => {
    return firstItem(
      dodays.filter(doday => durationToMinutes(doday.duration) < freeTime)
    );
  };

  const fillDay = async (date, selectedDuration, otherDodays) => {
    let dayDuration = selectedDuration;
    const dodaysToStay = [];
    let dodaysToReplan = otherDodays.concat();
    while (dayDuration < 8 * 60 && dodaysToReplan.length) {
      // 8 hours
      const fitDoday = findDodayToFit(dodaysToReplan, 8 * 60 - dayDuration);
      if (fitDoday) {
        dodaysToStay.push(fitDoday);
        dodaysToReplan = dodaysToReplan.filter(
          doday => doday.did !== fitDoday.did
        );
        replannedDodays = replannedDodays.filter(
          doday => doday.did !== fitDoday.did
        );
        dayDuration += durationToMinutes(fitDoday.duration);
      } else {
        break;
      }
    }
    await session.writeTransaction(tx =>
      multyUpdateDodaysTransaction(tx, {
        heroDID: req.user.did,
        dids: dodaysToStay.map(doday => doday.did),
        updates: { date },
      })
    );
    return dodaysToReplan || [];
  };

  do {
    const dayInfoResponse = await dayInfo(startDate);
    const parsedDayInfo = parseDayInfoResponse(dayInfoResponse);
    console.log('//////////', parsedDayInfo.otherDodays.length);
    replannedDodays = await fillDay(
      startDate,
      parsedDayInfo.selectedDuration,
      replannedDodays.concat(parsedDayInfo.otherDodays || [])
    );
    const date = new Date(startDate);
    startDate = date.setDate(date.getDate() + 1);
  } while (replannedDodays.length > 0);

  res.status(200).send({ succeed: true });
};
