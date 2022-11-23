import { booleanArg, extendType, nonNull, objectType } from "nexus";
import { PrismaClient } from "@prisma/client";

export const testQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.boolean("test", {
      args: { bool: nonNull(booleanArg()) },
      resolve: async (
        _,
        { bool },
        {
          prisma,
        }: {
          prisma: PrismaClient;
        }
      ) => {
        const documents = await prisma.document.findMany();
        console.log(documents);
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

export const document = objectType({
  name: "Document",
  definition: (t) => {
    t.id("id");
    t.field("value", { type: "JSON" });
  },
});
