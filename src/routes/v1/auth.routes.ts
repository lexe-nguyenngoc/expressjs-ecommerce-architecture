import authController from "@/controllers/auth.controller";
import { authentication } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", asyncHandler(authController.signup));
authRouter.post("/login", asyncHandler(authController.login));

authRouter.use(authentication);
authRouter.post("/logout", asyncHandler(authController.logout));
authRouter.post("/refresh-token", asyncHandler(authController.refreshToken));

export default authRouter;
