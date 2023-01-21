import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom-error/custom-error";
import { router as usersRouter } from "./routes/routes";
import { initSessionMiddleware } from "./passport-config/session";
import { passport } from "./passport-config/passportConfig";
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", usersRouter);
//init passport middleware
app.use(initSessionMiddleware());

//init passport
app.use(passport.initialize());
//init passport session middleware
app.use(passport.session());
//check for 404 error that has to work globally
app.use(() => {
  throw new CustomError("Could not find route", 404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown request" });
});

app.listen(port, () => {
  console.log(`SERVER, is running on port ${port}`);
});
