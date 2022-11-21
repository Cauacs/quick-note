import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./prisma";
import { schema } from "../modules/graphql/schema";

const server = new ApolloServer({
  schema,
});

const app = async () => {
  const url = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
      prisma,
    }),
  });
  console.log(`server ready at: ${url}`);
};

app();
