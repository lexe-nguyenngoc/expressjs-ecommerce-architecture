import compression from "compression";
import "dotenv/config";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

import configs from "@/configs";
import { connectDatabase } from "@/databases";
import { errorHandler } from "@/middlewares";
import router from "@/routes";

const app: Application = express();

// Middlewares
app.use(morgan(configs.isDEV ? "dev" : "combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to databases
connectDatabase();

// Router
app.use("/api", router);

// Error Handler
app.use(errorHandler);

export default app;
