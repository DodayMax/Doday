import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import {
  createDodayTransaction,
  createAndTakeDodayTransaction,
  takeDodayTransaction,
  dodaysQuery,
  deleteDodayTransaction,
  removeDodayTransaction,
  updateDodayTransaction,
} from '../queries-mutations/dodays';

export const getDodaysController = (req: Request, res: Response) => {
  const session = driver.session();

  const params: DodaysQueryParams = {
    heroDID: req.user.did,
  };

  if (req.query.type) params.type = Number(req.query.type);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;

  session
    .readTransaction(tx => dodaysQuery(tx, params))
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const createDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      createDodayTransaction(tx, {
        heroDID: req.user.did,
        doday: body.doday,
        resource: body.resource,
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

export const createAndTakeDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;
  const take = req.query.take;

  session
    .writeTransaction(tx => {
      if (take) {
        return createAndTakeDodayTransaction(tx, {
          heroDID: req.user.did,
          doday: body.doday,
          progress: body.progress,
          resource: body.resource,
        });
      }
      return createDodayTransaction(tx, {
        heroDID: req.user.did,
        doday: body.doday,
        resource: body.resource,
      });
    })
    .then(result => {
      session.close();
      res.status(200).send({ success: true });
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const takeDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body as any;

  session
    .writeTransaction(tx =>
      takeDodayTransaction(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
        progress: body,
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

export const deleteDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .writeTransaction(tx =>
      deleteDodayTransaction(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
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

// Just remove doday from Hero that taken it

export const removeDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .writeTransaction(tx =>
      removeDodayTransaction(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
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

export const updateDodayController = (req: Request, res: Response) => {
  const session = driver.session();

  const body = req.body;

  session
    .writeTransaction(tx =>
      updateDodayTransaction(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
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

export type DodaysQueryParams = {
  heroDID: string;
  type?: number;
  createdBy?: string;
};
