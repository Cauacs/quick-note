import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./prisma";
import { schema } from "../graphql/schema";

export const server = new ApolloServer({
  schema,
});

// const app = async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({ req }) => ({ req, prisma }),
//   });
//   console.log(`server ready at: ${url}`);
// };

// app();

// exports.handler = startServerAndCreateLambdaHandler(server, {
//   context: async ({ event, context }) => ({
//     lambdaEvent: event,
//     lambdaContext: context,
//     prisma,
//   }),
// });
