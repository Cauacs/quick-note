import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./prisma";
import { schema } from "../graphql/schema";
import { PrismaClient } from "@prisma/client";
import { Context } from "../types/Context";

const server = new ApolloServer<Context>({
  schema,
});

const app = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({ req, prisma }),
  });
  console.log(`server ready at: ${url}`);
};

app();
