import {
  GatewayEvent,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { server } from "../bundle/src/lib/apolloserver";
import { prisma } from "../bundle/src/lib/prisma";

// exports.handler = startServerAndCreateLambdaHandler(server, {
//   context: async ({ event, context }) => ({
//     lambdaEvent: event,
//     lambdaContext: context,
//     prisma,
//   }),
// });

async function handler(event, context, callback) {
  const apolloHandler = startServerAndCreateLambdaHandler(server, {
    context: async ({ event, context }) => ({
      lambdaEvent: event,
      lambdaContext: context,
      prisma,
    }),
  });
  const resp = await apolloHandler(event, context, callback);
  return {
    ...resp,
    headers: {
      ...resp?.headers,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
}

exports.handler = handler;
