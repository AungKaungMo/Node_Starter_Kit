import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DATABASE_URL, "sol");
const prisma = new PrismaClient();

export default prisma;
