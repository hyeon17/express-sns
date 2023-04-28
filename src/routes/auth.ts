import { UserController } from "@/controllers/UserController";
import {
  AuthMiddleware,
  ValidateMiddleware,
  UploadMiddleware,
} from "@/middleware";
import { Router } from "express";

const router = Router();

// 회원가입
router.post(
  "/signup",
  UploadMiddleware.signup,
  ValidateMiddleware.signup,
  UserController.signup
);
// 로그인
router.post("/login", ValidateMiddleware.login, UserController.login);
// 유저 검증
router.get("/verify", AuthMiddleware.verifyToken, UserController.verify);

export default router;
