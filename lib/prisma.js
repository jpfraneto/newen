import { PrismaClient } from '@prisma/client';

let global = {};

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['info'],
  });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
