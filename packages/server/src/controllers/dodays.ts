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
  dodayByDIDQuery,
  dodayWithProgressByDIDQuery,
  dodaysWithProgressQuery,
  dodaysCountQuery,
  dodaysSearchQuery,
  dodaysSearchCountQuery,
} from '../queries-mutations/dodays';

export const getDodaysController = (req: Request, res: Response) => {
  const session = driver.session();

  const params: DodaysQueryParams = {
    heroDID: req.user.did,
  };

  if (req.query.type) params.type = Number(req.query.type);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;
  if (req.query.skip) params.skip = Number(req.query.skip);
  if (req.query.limit) params.limit = Number(req.query.limit);

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

export const getDodaysCountController = (req: Request, res: Response) => {
  const session = driver.session();

  const params: DodaysQueryParams = {
    heroDID: req.user.did,
  };

  if (req.query.type) params.type = Number(req.query.type);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;

  session
    .readTransaction(tx => dodaysCountQuery(tx, params))
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const searchDodaysController = (req: Request, res: Response) => {
  const session = driver.session();

  const params: DodaysQueryParams = {
    heroDID: req.user.did,
    term: req.query.term,
  };

  if (req.query.type) params.type = Number(req.query.type);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;
  if (req.query.skip) params.skip = Number(req.query.skip);
  if (req.query.limit) params.limit = Number(req.query.limit);

  session
    .readTransaction(tx => dodaysSearchQuery(tx, params))
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const searchDodaysCountController = (req: Request, res: Response) => {
  const session = driver.session();

  const params: DodaysQueryParams = {
    heroDID: req.user.did,
    term: req.query.term,
  };

  if (req.query.type) params.type = Number(req.query.type);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;

  session
    .readTransaction(tx => dodaysSearchCountQuery(tx, params))
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const getDodayByDID = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      dodayByDIDQuery(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
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

export const getDodaysWithProgressController = (
  req: Request,
  res: Response
) => {
  const session = driver.session();

  const params: DodaysWithProgressQueryParams = {
    heroDID: req.user.did,
  };

  if (req.query.dodaytype) params.dodaytype = Number(req.query.dodaytype);
  if (req.query.exactDate) params.exactDate = Number(req.query.exactDate);
  if (req.query.date) params.date = Number(req.query.date);
  if (req.query.startdate) params.startdate = Number(req.query.startdate);
  if (req.query.enddate) params.enddate = Number(req.query.enddate);
  if (req.query.completed) params.completed = JSON.parse(req.query.completed);
  if (req.query.createdBy) params.createdBy = req.query.createdBy;

  session
    .readTransaction(tx => dodaysWithProgressQuery(tx, params))
    .then(result => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch(e => {
      console.error(e);
      session.close();
    });
};

export const getDodaysWithProgressByDIDController = (
  req: Request,
  res: Response
) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      dodayWithProgressByDIDQuery(tx, {
        heroDID: req.user.did,
        dodayDID: req.params.did,
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
  console.log(body, '******');
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
  skip?: number;
  limit?: number;
  term?: string;
};

export type DodaysWithProgressQueryParams = {
  heroDID: string;
  dodaytype?: number;
  date?: number; // <= date
  exactDate?: number; // only for this date
  startdate?: number;
  enddate?: number;
  completed?: boolean;
  createdBy?: string;
};
