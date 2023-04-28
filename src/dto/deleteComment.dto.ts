import { Comment } from "@/entity";
import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface DeleteCommentRequestDto extends Request<Pick<Comment, "id">> {
  decoded?: TokenPayload;
}

export interface DeleteCommentResponseDto
  extends Response<NonPayloadResponse> {}
