import gql from "graphql-tag";
import client from '../apollo-client';
import { goals } from '@lib/fake-data/dodays';
import * as moment from 'moment';

// Goals

export const allGoals = (variables: any) => {
  return goals;
}