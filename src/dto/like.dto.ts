import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface LikeRequestDto extends Request<{ id: string }> {
  decoded?: TokenPayload;
}

export interface LikeResponseDto extends Response<NonPayloadResponse> {}
