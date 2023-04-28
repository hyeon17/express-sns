import { Request, Response } from "express";
import { NonPayloadResponse } from "./response.dto";
import { TokenPayload } from "@/util/auth";

export interface DeletePostRequestDto extends Request<{ id: string }> {
  decoded?: TokenPayload;
}

export interface DeletePostResponseDto extends Response<NonPayloadResponse> {}
