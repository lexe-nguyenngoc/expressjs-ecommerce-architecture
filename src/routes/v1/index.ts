import express from "express";

import apiKeyRouter from "./apiKey.routes";
import authRouter from "./auth.routes";

const routerV1 = express.Router();

routerV1.use("/api-key", apiKeyRouter);
routerV1.use("/", authRouter);

export default routerV1;
