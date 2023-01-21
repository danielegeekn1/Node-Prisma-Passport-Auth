import express, { NextFunction, Request, Response } from "express";
import { router as usersRouter } from "./routes/routes";
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", usersRouter);
app.listen(port, () => {
  console.log(`SERVER, is running on port ${port}`);
});
