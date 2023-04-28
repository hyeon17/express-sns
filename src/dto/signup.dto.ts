import { User } from "@/entity";
import * as core from "express-serve-static-core";
import { Request, Response } from "express";
import { AppResponse } from "./response.dto";
import { JwtPayload } from "jsonwebtoken";

export interface SignupRequestDto
  extends Request<
    core.ParamsDictionary,
    any,
    Pick<User, "email" | "password" | "username">
  > {
  file?: Express.MulterS3.File;
}

export interface SignupResponseDto
  extends Response<AppResponse<SignupPayload>> {}

export interface SignupPayload {
  content: Pick<User, "id" | "email" | "username"> &
    Required<Pick<JwtPayload, "iat" | "exp">>;
  accessToken: string;
}
