// import gql from 'graphql-tag';
// import client from '../apollo-client';
// import { Goal } from '@root/lib/models/entities/Goal';
// import {
//   neo4jResponseDateToJSDate,
//   dateFromNeo4jDate,
//   firstItem,
// } from '@root/lib/utils';

// // Goals

// export const fetchGoals = async (variables: any) => {
//   const res = await client.query({
//     query: gql`
//       query Goal($ownerDID: String) {
//         Goal(ownerDID: $ownerDID) {
//           did
//           type
//           name
//           color
//           startDate {
//             year
//             month
//             day
//           }
//           endDate {
//             year
//             month
//             day
//           }
//           children(orderBy: completed_asc) {
//             did
//             relatedGoal {
//               did
//               name
//               color
//             }
//             date {
//               year
//               month
//               day
//             }
//             completed
//             origin {
//               name
//               type
//               activityType
//             }
//           }
//         }
//       }
//     `,
//     variables,
//     fetchPolicy: 'no-cache',
//   });
//   const goal = res.data.Goal;

//   return parseGoalGraphQLResponseGoal(goal);
// };

// export const goalByDID = async (variables: any) => {
//   const res = await client.query({
//     query: gql`
//       query Goal($did: String) {
//         Goal(did: $did) {
//           did
//           type
//           name
//           color
//           startDate {
//             year
//             month
//             day
//           }
//           endDate {
//             year
//             month
//             day
//           }
//           children(orderBy: completed_asc) {
//             did
//             date {
//               year
//               month
//               day
//             }
//             completed
//             origin {
//               name
//               type
//               activityType
//             }
//           }
//         }
//       }
//     `,
//     variables,
//     fetchPolicy: 'no-cache',
//   });
//   const goals = res.data.Goal;

//   return firstItem(parseGoalGraphQLResponseGoal(goals));
// };

// export const parseGoalGraphQLResponseGoal = res => {
//   return res.map(goal => ({
//     ...goal,
//     startDate: dateFromNeo4jDate(goal.startDate),
//     endDate: dateFromNeo4jDate(goal.endDate),
//     children:
//       goal.children &&
//       goal.children.map(progress => ({
//         ...progress,
//         date: dateFromNeo4jDate(progress.date),
//         ...firstItem(progress.origin),
//         relatedGoal: firstItem(progress.relatedGoal),
//         origin: undefined,
//       })),
//   }));
// };

// // uses actual API don't needed for now

// export const fetchAllGoals = () => {
//   return fetch(`/api/goals`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//     },
//   }).then((res: Response) => {
//     return parseGoalsResponse(res);
//   });
// };

// export const parseGoalsResponse = async (res): Promise<Goal[]> => {
//   const json = await res.json();
//   const goals = [];
//   json.map(goal => {
//     goal._fields.map(node => {
//       const goal = node.properties;
//       const startDate = goal.startDate;
//       const endDate = goal.endDate;
//       goal.startDate = neo4jResponseDateToJSDate(startDate);
//       goal.endDate = neo4jResponseDateToJSDate(endDate);
//       goals.push(goal);
//     });
//   });
//   return goals;
// };

export {};
