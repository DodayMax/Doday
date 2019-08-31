import { driver } from '../config/neo4j-driver';
import { Request, Response } from 'express';
import {
  getAllGoalsQuery,
  createGoalMutation,
  deleteGoalTransaction,
} from '../queries-mutations/goals';

export const getAllGoalsTransaction = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .readTransaction(tx =>
      getAllGoalsQuery(tx, {
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

export const createGoalTransaction = (req: Request, res: Response) => {
  const session = driver.session();

  const goal = req.body as any;

  session
    .readTransaction(tx =>
      createGoalMutation(tx, {
        heroDID: req.user.did,
        goal,
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

// Completely delete goal from app and remove all relations

export const deleteGoal = (req: Request, res: Response) => {
  const session = driver.session();

  session
    .writeTransaction(tx =>
      deleteGoalTransaction(tx, { heroDID: req.user.did, did: req.params.did })
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
