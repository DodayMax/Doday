import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import { dodaysWithProgressQuery } from '../queries-mutations/dodays';

export const getDodaysWithProgressController = (
  req: Request,
  res: Response
) => {
  const session = driver.session();

  const params: DodaysWithProgressQueryParams = {
    heroDID: req.user.did,
  };

  if (req.query.dodaytype) params.dodaytype = Number(req.query.dodaytype);
  if (req.query.startdate) params.startdate = req.query.startdate;
  if (req.query.enddate) params.enddate = req.query.enddate;
  if (req.query.completed) params.completed = req.query.completed;
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

export type DodaysWithProgressQueryParams = {
  heroDID: string;
  dodaytype?: number;
  startdate?: number;
  enddate?: number;
  completed?: boolean;
  createdBy?: string;
};
