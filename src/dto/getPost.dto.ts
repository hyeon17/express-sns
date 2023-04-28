import { Post } from "@/entity";
import { Request, Response } from "express";
import { AppResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface GetPostRequestDto extends Request<{ id: string }> {
  decoded?: TokenPayload;
}

export interface GetPostResponseDto
  extends Response<AppResponse<GetPostPayload>> {}

export interface GetPostPayload
  extends Pick<
    Post,
    | "content"
    | "author"
    | "files"
    | "comments"
    | "likes"
    | "createdAt"
    | "updatedAt"
  > {}
