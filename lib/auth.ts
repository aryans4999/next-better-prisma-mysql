import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
// Import the driver adapter for your specific database (example uses PostgreSQL)
// Initialize the adapter according to your driver's requirements
// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mysql", "postgresql", ...etc
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
});
