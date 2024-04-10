import compression from "compression";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

const app: Application = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to express js server",
  });
});

export default app;
