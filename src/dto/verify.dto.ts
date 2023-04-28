import { Request, Response } from "express";
import { AppResponse } from "./response.dto";
import { User } from "@/entity";
import { TokenPayload } from "@/util/auth";

export interface VerifyRequestDto extends Request {
  decoded?: TokenPayload;
}

export interface VerifyResponseDto
  extends Response<AppResponse<VerifyPayload>> {}

export interface VerifyPayload {
  user: Pick<User, "id" | "email" | "username" | "profile">;
}
