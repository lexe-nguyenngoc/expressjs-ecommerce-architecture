import express from "express";

const apiKeyRouter = express.Router();

apiKeyRouter.route("/").get((req, res) => {
  res.send("create api key");
});

export default apiKeyRouter;
