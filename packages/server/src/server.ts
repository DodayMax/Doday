import errorHandler from 'errorhandler';

import app, { apolloServer } from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

apolloServer
  .listen(process.env.GRAPHQL_LISTEN_PORT || 4040, '0.0.0.0')
  .then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
  });

export default server;
