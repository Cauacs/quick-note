import { booleanArg, extendType, idArg, nonNull, objectType } from "nexus";
import { PrismaClient } from "@prisma/client";

export const testQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.boolean("test", {
      args: { bool: nonNull(booleanArg()) },
      resolve: async (_, { bool }, { prisma }: { prisma: PrismaClient }) => {
        return bool;
      },
    });
  },
});
export const getAllDocuments = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("documents", {
      type: "Document",
      resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
        const documents = await prisma.document.findMany();
        return documents;
      },
    });
  },
});

export const getQueryById = extendType({
  type: "Query",
  definition(t) {
    t.field("document", {
      type: "Document",
      args: { id: nonNull(idArg()) },
      resolve: async (_, { id }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.document.findUnique({ where: { id: Number(id) } });
      },
    });
  },
});

export const document = objectType({
  name: "Document",
  definition: (t) => {
    t.id("id");
    t.field("value", { type: "JSON" });
  },
});
