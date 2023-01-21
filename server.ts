import express, { NextFunction, Request, Response } from "express";
const router = express();
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { CustomError } from "./custom-error/custom-error";
const prisma = new PrismaClient();
const port = process.env.PORT;
router.use(express.json());
router.use(express.urlencoded({ extended: false })); //allows us to send data from frontend to our server
router.set("view engine", "ejs");

router.get("/", (req, res) => {
  res.send("home");
});
router.get("/login", async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.render("login");
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new CustomError("add some valid inputs", 422));
    }
    const { name, email, password } = req.body;
    let hashPsw = await bcrypt.hash(password, 10);
    const createUsers = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashPsw,
      },
    });
    console.log({ createUsers });
    //req.flash("success_msg", " you successfully registered, you can login");
    res.redirect("/login");
  }
);
router.listen(port, () => {
  console.log(`SERVER: running on port ${port}`);
});
