import authController from "@/controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", authController.signup);

export default authRouter;
