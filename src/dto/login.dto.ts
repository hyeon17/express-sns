import { User } from "@/entity";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";
import { AppResponse } from "./response.dto";

export interface LoginRequestDto
  extends Request<
    core.ParamsDictionary,
    any,
    Pick<User, "email" | "password">
  > {}

export interface LoginResponseDto extends Response<AppResponse<LoginPayload>> {}

export interface LoginPayload {
  content: Pick<User, "id" | "email" | "username" | "profile"> &
    Required<Pick<JwtPayload, "iat" | "exp">>;
  accessToken: string;
}
