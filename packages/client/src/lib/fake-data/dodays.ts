import { Doday } from '../models/entities/Doday';

export const dodays: Doday[] = [
  {
    did: '123',
    type: 0,
    public: false,
    name: 'First',
    date: new Date(1551551594107),
    completed: false,
  },
  {
    did: '124',
    type: 0,
    public: false,
    name: 'Second',
    date: new Date(1551551594107),
    completed: false,
  },
  {
    did: '125',
    type: 0,
    public: false,
    name: 'Third',
    date: new Date(1551551594107),
    completed: true,
  },
  {
    did: '126',
    type: 0,
    public: false,
    name: 'Third',
    date: new Date('2019-03-05'),
    completed: false,
  },
];

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
