import express from "express";
import apiKeyController from "@/controllers/apiKey.controller";
import { asyncHandler } from "@/utils";

const apiKeyRouter = express.Router();

apiKeyRouter
  .route("/")
  .get((req, res) => {
    res.send("create api key");
  })
  .post(asyncHandler(apiKeyController.createApiKey));

export default apiKeyRouter;
