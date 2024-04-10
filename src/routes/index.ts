import express, { Request, Response, Router } from "express";
import routerV1 from "./v1";

const router: Router = express.Router();

router.use("/v1", routerV1);

router.get("/", (req: Request, res: Response) => {
  res.send("Everything's ok ");
});

export default router;
