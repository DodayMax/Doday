import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import { createAndTakeDoday as createDoday, activeDodaysForDate } from '../queries-mutations/dodays';

export const getActiveDodaysForDate = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      activeDodaysForDate(tx, { heroDID: req.user.did, date: Date.now() })
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
      createDoday(tx, { doday: body, heroDID: req.user.did })
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
