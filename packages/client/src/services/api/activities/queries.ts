import gql from 'graphql-tag';
import client from '../apollo-client';
import { firstItem } from '@root/lib/utils';
import {
  GraphQLResponseActivityProgress,
  parseGraphQLResponseActivityProgress,
} from '@root/lib/models/entities/activity';

// Activities queries

export const activitiesInProgress = async (variables: any) => {
  const res = await client.query({
    query: gql`
      query Progress($ownerDID: String) {
        Progress(ownerDID: $did, completed: false) {
          did
          date {
            year
            month
            day
          }
          completed
          origin {
            name
            activityType
            type
            duration
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  return res.data.Progress;
};

export const activitiesCompleted = async (variables: any) => {
  const res = await client.query({
    query: gql`
      query Progress($ownerDID: String) {
        Progress(ownerDID: $did, completed: true) {
          did
          date {
            year
            month
            day
          }
          completed
          origin {
            name
            activityType
            type
            duration
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  return res.data.Progress;
};

export const activitiesCreated = async (variables: any) => {
  const res = await client.query({
    query: gql`
      query Doday($ownerDID: String) {
        Doday(ownerDID: $did, type: 0) {
          name
          activityType
          type
          duration
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  return res.data.Doday;
};

export const activityProgressByDID = async (variables: any) => {
  const res = await client.query({
    query: gql`
      query Progress($did: String) {
        Progress(did: $did) {
          did
          date {
            year
            month
            day
          }
          dateIsLocked
          completed
          origin {
            name
            activityType
            type
            duration
            public
            resource {
              description
              image
              provider
              url
            }
            owner {
              did
            }
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  const progress: GraphQLResponseActivityProgress = firstItem(
    res.data.Progress
  );

  return parseGraphQLResponseActivityProgress(progress);
};
