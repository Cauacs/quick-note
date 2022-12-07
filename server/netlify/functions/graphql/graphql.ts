import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import { server } from "../bundle/src/lib/apolloserver";
import { prisma } from "../bundle/src/lib/prisma";

exports.handler = startServerAndCreateLambdaHandler(server, {
  context: async ({ event, context }) => ({
    lambdaEvent: event,
    lambdaContext: context,
    prisma,
  }),
});
