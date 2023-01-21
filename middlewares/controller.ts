import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../custom-error/custom-error";
const prisma = new PrismaClient();
//middleware to createUser for post requests
export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
//middleware to get all users for get requests
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findMany();
    res.render("login");
  } catch (error) {
    console.error(error);
  }
};

//middlewares for authentications

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.redirect("/logout");
  }
  next();
};
export const checkNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
