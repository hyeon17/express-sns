import { Comment } from "@/entity";
import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface UpdateCommentRequestDto
  extends Request<Pick<Comment, "id">, any, Pick<Comment, "content">> {
  decoded?: TokenPayload;
}

export interface UpdateCommentResponseDto
  extends Response<NonPayloadResponse> {}
