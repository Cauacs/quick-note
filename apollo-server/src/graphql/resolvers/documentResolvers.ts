import { Prisma, PrismaClient } from "@prisma/client";
import { FieldResolver } from "nexus";

export const getAllDocumentsResolver: FieldResolver<
  "Query",
  "documents" | "getAllDocuments"
> = async (_, __, { prisma }: { prisma: PrismaClient }) => {
  const documents = await prisma.document.findMany();
  console.log(documents);
  console.log("---------");
  console.log(documents[documents.length - 1]?.value);
  return documents;
};

export const getDocumentByIdResolver: FieldResolver<
  "Query",
  "Document" | "getDocumentById"
> = async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
  return await prisma.document.findUnique({ where: { id } });
};

export const createDocumentResolver: FieldResolver<
  "Mutation",
  "Document" | "createDocument"
> = async (_, { input }, { prisma }: { prisma: PrismaClient }) => {
  return await prisma.document.create({ data: { value: input.value } });
};

export const updateDocumentByIdResolver: FieldResolver<
  "Mutation",
  "Document" | "updateDocumentById"
> = async (_, { id, input }, { prisma }: { prisma: PrismaClient }) => {
  return await prisma.document.update({
    where: { id: id },
    data: { value: input.value },
  });
};

export const deleteDocumentByIdResolver: FieldResolver<
  "Mutation",
  "deleteDocumentById"
> = async (_, { id }, { prisma }: { prisma: PrismaClient }) => {
  //return await prisma.document.delete({ where: { id: id } });
  return await prisma.document.delete({ where: { id } });
};
