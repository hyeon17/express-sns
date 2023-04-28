import { Post } from "@/entity";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface CreatePostRequestDto
  extends Request<core.ParamsDictionary, any, Pick<Post, "content">> {
  file?: Express.MulterS3.File;
  decoded?: TokenPayload;
}

export interface CreatePostResponseDto extends Response<NonPayloadResponse> {}
