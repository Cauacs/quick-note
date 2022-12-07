import { PrismaClient } from "@prisma/client";
import { FieldResolver } from "nexus";

export const getAllUsersResolver: FieldResolver<
  "Query",
  "getAllUsersResolver"
> = async (_, __, { prisma }: { prisma: PrismaClient }) => {
  return await prisma.user.findMany();
};
