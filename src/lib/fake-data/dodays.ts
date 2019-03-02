import { Doday } from '@lib/common-interfaces';

export const fakeDodays: Doday[] = [
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
    date: new Date('2019-02-28').getMilliseconds(),
    completed: true,
  },
  {
    id: '127',
    type: 'folder',
    name: 'Health',
    children: [
      {
        id: '129',
        type: 'folder',
        name: 'Folder inside folder',
        children: [
          {
            id: '130',
            type: 'action',
            name: 'Inside 2 folders',
            date: new Date('2019-03-01').getMilliseconds(),
            completed: false,
          },
        ],
      },
      {
        id: '128',
        type: 'action',
        name: 'Inside folder',
        date: new Date('2019-03-01').getMilliseconds(),
        completed: false,
      },
    ],
  }
];