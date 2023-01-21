import express from "express";
const router = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const port = process.env.PORT;
router.get("/users", async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});
router.listen(port, () => {
  console.log(`SERVER: running on port ${port}`);
});
