import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import {
  createActivityTransaction,
  createAndTakeActivityTransaction,
  takeActivityTransaction,
  toggleDodayTransaction,
  deleteDodayTransaction,
  removeDodayTransaction,
  updateDodayTransaction,
} from '../queries-mutations/activities';

export const createActivity = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      createActivityTransaction(tx, {
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

export const createAndTakeActivity = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      createAndTakeActivityTransaction(tx, {
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

export const takeActivity = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      takeActivityTransaction(tx, {
        heroDID: req.user.did,
        did: req.params.did,
        date: body.date,
        dateIsLocked: body.dateIsLocked,
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

// Completely delete doday from app

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

// Just remove doday from Hero that taken it

export const removeDoday = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .writeTransaction(tx =>
      removeDodayTransaction(tx, { heroDID: req.user.did, did: req.params.did })
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

export const updateDoday = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body;

  session
    .writeTransaction(tx =>
      updateDodayTransaction(tx, {
        heroDID: req.user.did,
        did: req.params.did,
        updates: body,
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
