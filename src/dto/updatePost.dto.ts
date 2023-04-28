import { Post } from "@/entity";
import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface UpdatePostRequestDto
  extends Request<{ id: string }, any, Pick<Post, "content">> {
  file?: Express.MulterS3.File;
  decoded?: TokenPayload;
}

export interface UpdatePostResponseDto extends Response<NonPayloadResponse> {}
