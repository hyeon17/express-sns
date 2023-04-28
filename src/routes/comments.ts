import { CommentController } from "@/controllers/CommentController";
import { AuthMiddleware, ValidateMiddleware } from "@/middleware";
import { Router } from "express";

const router = Router();

// 댓글 작성
router.post(
  "/",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.createComment,
  CommentController.createComment
);
// 댓글 수정
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.updateComment,
  CommentController.updateComment
);
// 댓글 삭제
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidateMiddleware.deleteComment,
  CommentController.deleteComment
);

export default router;
