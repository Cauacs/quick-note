import { server } from "../bundle/apolloserver";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";

const lambdaServer = startServerAndCreateLambdaHandler(server);
