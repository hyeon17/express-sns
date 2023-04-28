import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface UnLikeRequestDto extends Request<{ id: string }> {
  decoded?: TokenPayload;
}

export interface UnLikeResponseDto extends Response<NonPayloadResponse> {}
