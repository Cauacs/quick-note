import { Prisma, PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

export interface Context {
  req: IncomingMessage;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}
