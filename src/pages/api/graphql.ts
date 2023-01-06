import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "apollo-server/src/lib/prisma";
import { server } from "apollo-server/src/lib/apolloserver";

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
  }),
});
