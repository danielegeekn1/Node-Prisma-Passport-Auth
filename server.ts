import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom-error/custom-error";
import { router as usersRouter } from "./routes/routes";
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", usersRouter);
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
