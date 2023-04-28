import { HTTP_STATUS } from "@/constants/httpStatus";
import {
  CreateCommentRequestDto,
  CreateCommentResponseDto,
  DeleteCommentRequestDto,
  DeleteCommentResponseDto,
  UpdateCommentRequestDto,
  UpdateCommentResponseDto,
} from "@/dto";
import { ApiError } from "@/error/ApiError";
import {
  commentRepository,
  postRepository,
  userRepository,
} from "@/repository";

export class CommentController {
  static async createComment(
    req: CreateCommentRequestDto,
    res: CreateCommentResponseDto
  ) {
    try {
      const { postId, content } = req.body;
      const tokenPayload = req.decoded;

      const post = await postRepository.findOne({
        where: {
          id: +postId,
        },
      });

      const author = await userRepository.findOne({
        where: {
          email: tokenPayload.email,
        },
      });

      if (!post || !author) throw new ApiError("LikeNotFoundError");

      const comment = commentRepository.create({
        content,
        post,
        author,
      });

      await commentRepository.save(comment);

      return res.status(HTTP_STATUS.Created).json({ ok: true });
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.status)
          .json({ ok: false, error: { ...error, message: error.message } });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }

  static async updateComment(
    req: UpdateCommentRequestDto,
    res: UpdateCommentResponseDto
  ) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const tokenPayload = req.decoded;

      const comment = await commentRepository.findOne({
        where: {
          id: +id,
        },
        relations: ["author"],
      });

      if (!comment) throw new ApiError("CommentNotFoundError");

      if (comment.author.email !== tokenPayload.email)
        throw new ApiError("UnauthorizedUserError");

      await commentRepository.update(
        { id: +id },
        {
          content,
        }
      );

      return res.json({ ok: true });
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.status)
          .json({ ok: false, error: { ...error, message: error.message } });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }

  static async deleteComment(
    req: DeleteCommentRequestDto,
    res: DeleteCommentResponseDto
  ) {
    try {
      const { id } = req.params;
      const tokenPayload = req.decoded;

      const comment = await commentRepository.findOne({
        where: {
          id: +id,
        },
        relations: ["author"],
      });

      if (!comment) throw new ApiError("CommentNotFoundError");

      if (comment.author.email !== tokenPayload.email)
        throw new ApiError("UnauthorizedUserError");

      await commentRepository.delete({ id: +id });

      return res.json({ ok: true });
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.status)
          .json({ ok: false, error: { ...error, message: error.message } });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }
}
