import { Comment, Post } from "@/entity";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface CreateCommentRequestDto
  extends Request<
    core.ParamsDictionary,
    any,
    { postId: Pick<Post, "id"> } & Pick<Comment, "content">
  > {
  decoded?: TokenPayload;
}

export interface CreateCommentResponseDto
  extends Response<NonPayloadResponse> {}
