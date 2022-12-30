import { arg, core, extendType, nonNull, objectType, stringArg } from "nexus";
import {
  createDocumentResolver,
  deleteDocumentByIdResolver,
  getAllDocumentsResolver,
  getDocumentByIdResolver,
  updateDocumentByIdResolver,
} from "../resolvers/documentResolvers";

const jsonArg = (opts: core.NexusArgConfig<"JSON">) =>
  arg({ ...opts, type: "JSON" });

export const document = objectType({
  name: "Document",
  definition: (t) => {
    t.nonNull.id("id");
    t.field("value", { type: "JSON" });
  },
});

export const getAllDocuments = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("documents", {
      type: "Document",
      resolve: getAllDocumentsResolver,
    });
  },
});
export const getDocumentById = extendType({
  type: "Query",
  definition(t) {
    t.field("Document", {
      type: "Document",
      args: { id: nonNull(stringArg()) },
      resolve: getDocumentByIdResolver,
    });
  },
});
export const updateDocumentById = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateDocumentById", {
      type: "Document",
      args: {
        id: nonNull(stringArg()),
        value: nonNull(jsonArg({ type: "JSON" })),
      },
      resolve: updateDocumentByIdResolver,
    });
  },
});

export const deleteDocumentById = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteDocumentById", {
      type: "Document",
      args: { id: nonNull(stringArg()) },
      resolve: deleteDocumentByIdResolver,
    });
  },
});

export const createDocument = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDocument", {
      type: "Document",
      args: { value: nonNull(jsonArg({ type: "JSON" })) },
      resolve: createDocumentResolver,
    });
  },
});