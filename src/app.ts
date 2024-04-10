import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes";
import { connectDatabase } from "./databases";

const app: Application = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

// Connect to databases
connectDatabase();

// Router
app.use(router);

export default app;
