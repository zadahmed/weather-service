import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './api/graphql/schema.js';
import resolvers from './api/graphql/resolvers.js';
import config from './config/index.js';
import weatherService from './services/weather/index.js';
import rankingService from './services/ranking/index.js';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
    introspection: config.server.nodeEnv !== 'production',
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.server.port },
    context: async ({ req }) => ({
      dataSources: {
        weatherService,
        rankingService
      }
    }),
  });

  console.log(`🚀 Server ready at ${url}`);
  
  return server;
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default startServer;