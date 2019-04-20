import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import {
  createDodayTransaction,
  createAndTakeDodayTransaction,
  toggleDodayTransaction,
  activeDodaysQuery,
  publicDodaysQuery,
  deleteDodayTransaction,
  removeDodayTransaction,
  updateDodayTransaction,
} from '../queries-mutations/dodays';

export const getActiveDodays = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      activeDodaysQuery(tx, {
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

export const getPublicDodays = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      publicDodaysQuery(tx, {
        heroDID: req.user.did,
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

export const create = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      createDodayTransaction(tx, {
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
