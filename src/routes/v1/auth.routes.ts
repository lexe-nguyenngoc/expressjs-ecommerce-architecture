import authController from "@/controllers/auth.controller";
import { asyncHandler } from "@/utils";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", asyncHandler(authController.signup));
authRouter.post("/login", asyncHandler(authController.login));

export default authRouter;
