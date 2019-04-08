import { Doday } from '../models/entities/Doday';

export const goals = [
  {
    did: '127',
    type: 1,
    name: 'Health',
    dodays: [
      {
        did: '129',
        type: 1,
        parent: {
          did: '127',
          type: 1,
          name: 'Health',
        },
        name: 'Goal inside goal',
        dodays: [
          {
            did: '130',
            type: 0,
            parent: {
              did: '129',
              type: 1,
              name: 'Goal inside goal',
            },
            name: 'Inside 2 goals',
            date: new Date('2019-03-01').getMilliseconds(),
            completed: false,
          },
        ],
      },
      {
        did: '128',
        type: 0,
        parent: {
          did: '127',
          type: 1,
          name: 'Health',
        },
        name: 'Inside goal',
        date: new Date('2019-03-01'),
        completed: false,
      },
    ],
  },
];
