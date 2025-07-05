import { PrismaClient } from "@/app/generated/prisma";

const globalprisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalprisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalprisma.prisma = prisma;
