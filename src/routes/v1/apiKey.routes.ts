import express from "express";
import apiKeyController from "@/controllers/apiKey.controller";

const apiKeyRouter = express.Router();

apiKeyRouter
  .route("/")
  .get((req, res) => {
    res.send("create api key");
  })
  .post(apiKeyController.createApiKey);

export default apiKeyRouter;
