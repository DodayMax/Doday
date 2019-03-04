import gql from "graphql-tag";
import client from '../apollo-client';
import { dodays } from '@lib/fake-data/dodays';
import * as moment from 'moment';

// Dodays

export const activeDodaysForHero = (variables: any) => {
  return client
    .query({
      query: gql`
        query activeDodays($id: ID!, $date: String) {
          activeDodays(heroID: $id, date: $date) {
            id
            name
            completed
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}

export const dodaysForToday = (variables: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const today = new Date();
      resolve(dodays.filter(doday => {
        const dodayDate = new Date(doday.date!);
        return today >= dodayDate;
      }))
    }, 1000)
  })
}

export const dodaysForDate = (variables: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chosenDate = moment(variables.date).format('ll');
      resolve(dodays.filter(doday => {
        const dodayDate = moment(new Date(doday.date!)).format('ll');
        return chosenDate === dodayDate;
      }))
    }, 1000)
  })
}