import { Doday } from '@lib/common-interfaces';

export const dodays: Doday[] = [
  {
    id: '123',
    type: 'action',
    name: 'First',
    date: 1551551594107,
    completed: false,
  },
  {
    id: '124',
    type: 'action',
    name: 'Second',
    date: 1551551594107,
    completed: false,
  },
  {
    id: '125',
    type: 'action',
    name: 'Third',
    date: 1551551594107,
    completed: true,
  },
  {
    id: '126',
    type: 'action',
    name: 'Third',
    date: new Date('2019-03-05').getTime(),
    completed: false,
  },
];

export const goals = [
  {
    id: '127',
    type: 'goal',
    name: 'Health',
    children: [
      {
        id: '129',
        type: 'goal',
        parent: {
          id: '127',
          type: 'goal',
          name: 'Health',
        },
        name: 'Goal inside goal',
        children: [
          {
            id: '130',
            type: 'action',
            parent: {
              id: '129',
              type: 'goal',
              name: 'Goal inside goal',
            },
            name: 'Inside 2 goals',
            date: new Date('2019-03-01').getMilliseconds(),
            completed: false,
          },
        ],
      },
      {
        id: '128',
        type: 'action',
        parent: {
          id: '127',
          type: 'goal',
          name: 'Health',
        },
        name: 'Inside goal',
        date: new Date('2019-03-01').getMilliseconds(),
        completed: false,
      },
    ],
  }
];