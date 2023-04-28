import { PostController } from "@/controllers/PostController";
import { UploadMiddleware } from "@/middleware";
import { AuthMiddleware } from "@/middleware/AuthMiddleware";
import { ValidateMiddleware } from "@/middleware/ValidateMiddleware";
import { Router } from "express";

const router = Router();

// 유저 글 전체 목록 조회
router.get("/", ValidateMiddleware.getPosts, PostController.getPosts);
// 특정 글 조회
router.get(
  "/:id",
  ValidateMiddleware.getPost,
  AuthMiddleware.verifyToken,
  PostController.getPost
);
// 글 작성
router.post(
  "/",
  AuthMiddleware.verifyToken,
  UploadMiddleware.post,
  ValidateMiddleware.createPost,
  PostController.createPost
);
// 좋아요 등록
router.post(
  "/like/:id",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.like,
  PostController.like
);
// 글 수정
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  UploadMiddleware.post,
  ValidateMiddleware.updatePost,
  PostController.updatePost
);
// 글 삭제
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.deletePost,
  PostController.deletePost
);
// 좋아요 취소
router.delete(
  "/like/:id",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.like,
  PostController.unLike
);

export default router;
