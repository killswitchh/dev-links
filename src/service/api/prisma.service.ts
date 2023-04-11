import Prisma, * as PrismaScope from '@prisma/client';
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;

export const PrismaClientKnownRequestError =
  Prisma?.Prisma.PrismaClientKnownRequestError || PrismaScope?.Prisma.PrismaClientKnownRequestError;
export const prisma = new PrismaClient();
export default prisma;
