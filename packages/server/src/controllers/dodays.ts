import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import {
  createAndTakeDodayTransaction,
  toggleDodayTransaction,
  activeDodaysForDateQuery,
  deleteDodayTransaction,
} from '../queries-mutations/dodays';

export const getActiveDodaysForDate = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      activeDodaysForDateQuery(tx, {
        heroDID: req.user.did,
        date: Number(req.query.date),
      })
    )
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const createAndTakeDoday = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      createAndTakeDodayTransaction(tx, {
        doday: body,
        heroDID: req.user.did,
      })
    )
    .then(result => {
      session.close();
      res.status(200).send({ success: true });
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const toggleDoday = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      toggleDodayTransaction(tx, { did: req.params.did, value: body.value })
    )
    .then(result => {
      session.close();
      res.status(200).send({ success: true });
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const deleteDoday = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .writeTransaction(tx =>
      deleteDodayTransaction(tx, { heroDID: req.user.did, did: req.params.did })
    )
    .then(result => {
      session.close();
      res.status(200).send({ success: true });
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};
