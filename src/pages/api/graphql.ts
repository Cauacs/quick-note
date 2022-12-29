import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { server } from "../../../apollo-server/src/lib/apolloserver";
import { prisma } from "../../../apollo-server/src/lib/prisma";

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
  }),
});
