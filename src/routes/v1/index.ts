import express from "express";
import apiKeyRouter from "./apiKey.routes";

const routerV1 = express.Router();

routerV1.use("/api-key", apiKeyRouter);

export default routerV1;
