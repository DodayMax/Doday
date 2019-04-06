import express from 'express';
import { ApolloServer } from 'apollo-server';
import { v1 as neo4j } from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import { Express, Request, Response } from 'express';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from './util/logger';
import lusca from 'lusca';
import dotenv from 'dotenv';
import flash from 'express-flash';
import passport from 'passport';
import expressValidator from 'express-validator';
import bluebird from 'bluebird';
import { SESSION_SECRET } from './util/secrets';
import { typeDefs } from './graphql-schema';
import { IsAuthenticatedDirective, HasRoleDirective } from './directives';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '../.env' });

// Create Express server
const app: Express = express();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path;
  } else if (req.user && req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

require('./routes/authRoutes')(app);
require('./routes/paymentsRoutes')(app);

/*
 * Create an executable GraphQL schema object from GraphQL type definitions
 * including autogenerated queries and mutations.
 * Optionally a config object can be included to specify which types to include
 * in generated queries and/or mutations. Read more in the docs:
 * https://grandstack.io/docs/neo4j-graphql-js-api.html#makeaugmentedschemaoptions-graphqlschema
 */

const schema = makeAugmentedSchema({
  typeDefs,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
  },
});

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'doday')
);

/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
export const apolloServer = new ApolloServer({
  context: ({ req }) => {
    return {
      headers: req.headers,
      driver,
    };
  },
  schema,
});

export default app;
