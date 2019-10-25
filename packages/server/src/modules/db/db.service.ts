import { Injectable, Inject } from '@nestjs/common';
import { app, auth, storage } from 'firebase-admin';
import v1 from 'neo4j-driver';

@Injectable()
export class DBService {
  constructor(
    @Inject('FIREBASE_CONNECTION') private readonly firebase: app.App,
    @Inject('NEO4J') private readonly neo4jDriver: v1.Driver
  ) {}

  firebaseAuth(): auth.Auth {
    return this.firebase.auth();
  }

  firebaseStorage(): storage.Storage {
    return this.firebase.storage();
  }

  neo4j(): v1.Driver {
    return this.neo4jDriver;
  }
}
