import "dotenv/config";
import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes";
import { connectDatabase } from "./databases";

import configs from "./configs";

const app: Application = express();

// Middlewares
app.use(morgan(configs.isDEV ? "dev" : "combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

// Connect to databases
connectDatabase();

// Router
app.use("/api", router);

export default app;
