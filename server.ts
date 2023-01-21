import express, { Request, Response } from "express";
const router = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const port = process.env.PORT;
router.use(express.json());
router.set("view engine", "ejs");
/*
router.get("/users", async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});
router.post("/users/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const createUsers = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  res.status(200).json(createUsers);
});
*/
router.get("/", (req, res) => {
  res.send("home");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/logout", (req, res) => {
  res.render("logout");
});
router.listen(port, () => {
  console.log(`SERVER: running on port ${port}`);
});
