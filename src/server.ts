import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import express from "express";
import http from "http";
import prisma from "../prisma/prismaClient";

async function startApolloServer(typeDefs: any, resolvers: any) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async ({ req, res }) => {
      return { prisma };
    },
  });

  // More required logic for integrating with Express
  await server.start();

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
  });

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5050 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5050${server.graphqlPath}`);
}

export default startApolloServer;
