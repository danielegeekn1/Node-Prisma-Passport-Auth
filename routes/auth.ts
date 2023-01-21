import { NextFunction, Request, Response, Router } from "express";
import { passport } from "../passport-config/passportConfig";
const router = Router();
router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  //check wether there's no redirect or the redirect is not a string
  if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
    res.status(400);
    return next("Missing query redirect");
  }
  req.session.redirectTo = req.query.redirectTo;
  res.redirect("/auth/github/login");
});
router.get(
  "/auth/github/login",
  passport.authenticate("github", {
    scope: ["user:email"], //information we want to get from the user
  })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/github/login",
    keepSessionInfo: true, //so we cannot lose any data
  }),
  (req: Request, res: Response) => {
    if (typeof req.session.redirectTo !== "string") {
      return res.status(500).end();
    }
    res.redirect(req.session.redirectTo);
  }
);
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
    res.status(400);
    return next("Missing query redirect");
  }
  const redirectUrl = req.query.redirectTo;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(redirectUrl);
  });
});
export default router;
