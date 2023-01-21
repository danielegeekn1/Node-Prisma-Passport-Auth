import express, { Request, Response } from "express";
import { createUsers, getAllUsers } from "../middlewares/controller";
export const router = express();
import { check } from "express-validator";
router.use(express.json());
router.set("view engine", "ejs");
router.use(express.urlencoded({ extended: false })); //allows us to send data from frontend to our server
router.get("/", (req: Request, res: Response) => {
  res.send("home");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  [check("name").not().isEmpty(), check("password").isLength({ min: 4 })],
  createUsers
);
router.get("/login", getAllUsers);
router.get("/logout", (req: Request, res: Response) => {
  res.render("logout");
});
