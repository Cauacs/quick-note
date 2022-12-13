import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const main = async () => {
//   const document = await prisma.document.findUnique({
//     where: { id: "clbjm2vt40000ly1n1enfogy9" },
//   });
//   console.log(document);
// };

// main();

export { prisma };
