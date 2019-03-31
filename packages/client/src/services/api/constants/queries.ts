import gql from "graphql-tag";
import client from '../apollo-client';
import { activityTypes } from '@lib/fake-data/dodays';


// Activity types

export const getActivityTypes = (variables: any) => {
  return activityTypes;
}