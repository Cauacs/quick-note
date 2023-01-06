import {
  arg,
  core,
  extendType,
  inputObjectType,
  interfaceType,
  list,
  nonNull,
  objectType,
  stringArg,
  unionType,
} from "nexus";
import {
  createDocumentResolver,
  deleteDocumentByIdResolver,
  getAllDocumentsResolver,
  getDocumentByIdResolver,
  updateDocumentByIdResolver,
} from "../resolvers/documentResolvers";

//inputs

export const createDocumentInput = inputObjectType({
  name: "createDocumentInput",
  definition(t) {
    t.nonNull.list.field("input", { type: nonNull(blockElementInput) });
  },
});

export const customTextInput = inputObjectType({
  name: "customTextInput",
  definition(t) {
    t.nonNull.string("text");
    t.string("placeholder");
    t.boolean("bold");
    t.boolean("italic");
    t.boolean("underline");
    t.boolean("strikethrough");
  },
});

export const blockElementInput = inputObjectType({
  name: "blockElementInput",
  definition(t) {
    t.nonNull.string("type");
    t.nonNull.list.field("children", {
      type: nonNull(customTextInput),
    });
  },
});

//

export const customText = objectType({
  name: "customText",
  definition(t) {
    t.nonNull.string("text");
    t.string("placeholder");
    t.boolean("bold");
    t.boolean("italic");
    t.boolean("underline");
    t.boolean("strikethrough");
  },
});

export const blockElement = objectType({
  name: "blockElement",
  definition(t) {
    t.nonNull.string("type");
    t.nonNull.list.field("children", {
      type: "customText",
    });
  },
});

export const document = objectType({
  name: "Document",
  definition: (t) => {
    t.nonNull.id("id");
    //t.field("value", { type: "JSON" });
    t.nonNull.list.field("value", { type: "blockElement" });
    t.field("createAt", { type: "DateTime" });
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
        value: nonNull(list(blockElementInput)),
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
      args: { value: nonNull(list(blockElementInput)) },
      resolve: createDocumentResolver,
    });
  },
});
