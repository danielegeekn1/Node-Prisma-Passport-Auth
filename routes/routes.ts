import express, { Request, Response } from "express";
import { createUsers, getAllUsers } from "../middlewares/controller";
export const router = express();
import { check } from "express-validator";
router.use(express.json());
router.use(express.urlencoded({ extended: false })); //allows us to send data from frontend to our server
router.set("view engine", "ejs");

router.get("/", (req: Request, res: Response) => {
  res.send("home");
});
router.get("/login", getAllUsers);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  [check("username").not().isEmpty(), check("password").isLength({ min: 4 })],
  createUsers
);
