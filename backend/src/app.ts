import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import createHttpError, { isHttpError } from "http-errors";
import toDoRouter from "./routes/toDo";
const app = express();

app.use(express.json());
app.use("/api/toDo", toDoRouter);

app.use((req, res, next) => {
  next(createHttpError(400, "Endpoint is not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
