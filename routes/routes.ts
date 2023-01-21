import express, { Request, Response } from "express";
import {
  checkAuthenticated,
  checkNotAuthenticated,
  createUsers,
  getAllUsers,
} from "../middlewares/controller";
export const router = express();
import { check } from "express-validator";
import { nextTick } from "process";
//import authRoutes from "../routes/auth";
router.use(express.json());
router.set("view engine", "ejs");
router.use(express.urlencoded({ extended: false })); //allows us to send data from frontend to our server
//router.use("/auth", authRoutes);
router.get("/", (req: Request, res: Response) => {
  res.send("home");
});

router.get("/register", checkAuthenticated, (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  [check("name").not().isEmpty(), check("password").isLength({ min: 4 })],
  createUsers
);
router.get("/login", checkAuthenticated, getAllUsers);
router.get("/logout", checkNotAuthenticated, (req: Request, res: Response) => {
  res.render("logout");
});
router.delete("/logout", (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/login");
  });

  console.log("user logged out");
});
