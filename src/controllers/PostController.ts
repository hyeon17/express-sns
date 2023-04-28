import { HTTP_STATUS } from "@/constants/httpStatus";
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  GetPostRequestDto,
  GetPostResponseDto,
  GetPostsRequestDto,
  GetPostsResponseDto,
  LikeRequestDto,
  LikeResponseDto,
  UnLikeRequestDto,
  UnLikeResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from "@/dto";
import { ApiError } from "@/error/ApiError";
import { userRepository, postRepository, likeRepository } from "@/repository";

export class PostController {
  static async createPost(
    req: CreatePostRequestDto,
    res: CreatePostResponseDto
  ) {
    try {
      const { content } = req.body;
      const tokenPayload = req.decoded;
      const files = req?.file;

      const author = await userRepository.findOne({
        where: { email: tokenPayload.email },
      });

      const newPost = postRepository.create({
        content,
        files: files.location,
        author,
      });

      await postRepository.save(newPost);

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

  static async getPosts(req: GetPostsRequestDto, res: GetPostsResponseDto) {
    try {
      const { username } = req.query;

      const user = await userRepository.findOne({
        where: { username },
        relations: ["posts", "posts.likes", "posts.comments"],
        select: {
          posts: {
            id: true,
            files: true,
            likes: true,
            comments: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      });

      if (!user) throw new ApiError("NotFoundUserError");

      return res.json({
        ok: true,
        payload: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            ...(user.profile && { profile: user.profile }),
          },
          posts: [
            ...user.posts.map((post) => ({
              ...post,
              comments: post.comments.length,
              likes: post.likes.length,
            })),
          ],
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        const { status } = error;

        return res
          .status(status)
          .json({ ok: false, error: { ...error, message: error.message } });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }

  static async getPost(req: GetPostRequestDto, res: GetPostResponseDto) {
    try {
      const { id } = req.params;

      const post = await postRepository.findOne({
        where: {
          id: +id,
        },
        relations: ["author", "comments", "likes"],
        select: {
          author: {
            id: true,
            username: true,
            email: true,
          },
        },
      });

      if (!post) throw new ApiError("NotFoundPostError");

      return res.json({
        ok: true,
        payload: {
          content: post.content,
          author: post.author,
          files: post.files,
          comments: post.comments,
          likes: post.likes,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      });
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

  static async updatePost(
    req: UpdatePostRequestDto,
    res: UpdatePostResponseDto
  ) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const files = req?.file;
      const tokenPayload = req.decoded;

      const post = await postRepository.findOne({
        where: { id: +id },
        relations: ["author"],
      });

      if (!post) throw new ApiError("NotFoundPostError");

      if (post.author.email !== tokenPayload.email)
        throw new ApiError("UnauthorizedUserError");

      await postRepository.update(id, {
        content,
        ...(files && { files: files.location }),
      });

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

  static async deletePost(
    req: DeletePostRequestDto,
    res: DeletePostResponseDto
  ) {
    try {
      const { id } = req.params;
      const tokenPayload = req.decoded;

      const post = await postRepository.findOne({
        where: { id: +id },
        relations: ["author"],
      });

      if (!post) throw new ApiError("NotFoundPostError");

      if (post.author.email !== tokenPayload.email)
        throw new ApiError("UnauthorizedUserError");

      await postRepository.delete({ id: +id });

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

  static async like(req: LikeRequestDto, res: LikeResponseDto) {
    try {
      const { id } = req.params;
      const tokenPayload = req.decoded;

      const user = await userRepository.findOne({
        where: { email: tokenPayload.email },
      });

      const post = await postRepository.findOne({
        where: { id: +id },
      });

      if (!user || !post) throw new ApiError("LikeNotFoundError");

      const isLiked = await likeRepository.findOne({
        where: {
          post: { id: post.id },
          user: { id: user.id },
        },
        relations: ["post", "user"],
      });

      if (isLiked) throw new ApiError("LikeBadRequest");

      const like = likeRepository.create({
        user,
        post,
      });

      await likeRepository.save(like);

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

  static async unLike(req: UnLikeRequestDto, res: UnLikeResponseDto) {
    try {
      const { id } = req.params;
      const tokenPayload = req.decoded;

      const user = await userRepository.findOne({
        where: { email: tokenPayload.email },
      });

      const post = await postRepository.findOne({
        where: { id: +id },
        relations: ["author", "likes"],
      });

      if (!user || !post) throw new ApiError("LikeNotFoundError");

      const isLiked = await likeRepository.findOne({
        where: {
          post: { id: post.id },
          user: { id: user.id },
        },
        relations: ["post", "user"],
      });

      if (!isLiked) throw new ApiError("LikeNotFoundError");

      await likeRepository.delete({ id: isLiked.id });

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
