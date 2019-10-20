import { app, initializeApp, credential } from 'firebase-admin';
import { v1 as neo4j } from 'neo4j-driver';

export const dbProviders = [
  {
    provide: 'FIREBASE_CONNECTION',
    useFactory: async (): Promise<app.App> =>
      initializeApp({
        credential: credential.applicationDefault(),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      }),
  },
  {
    provide: 'NEO4J',
    useFactory: () =>
      neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'doday'),
        { disableLosslessIntegers: true }
      ),
  },
];
