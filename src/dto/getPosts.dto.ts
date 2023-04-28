import { Post, User } from "@/entity";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { AppResponse } from "./response.dto";

export interface GetPostsRequestDto
  extends Request<core.ParamsDictionary, any, any, Pick<User, "username">> {}

export interface GetPostsResponseDto
  extends Response<AppResponse<GetPostsPayload>> {}

export interface GetPostsPayload {
  user: Pick<User, "id" | "email" | "username" | "profile">;
  posts: Pick<Post, "id" | "files" | "createdAt" | "updatedAt">[];
}
