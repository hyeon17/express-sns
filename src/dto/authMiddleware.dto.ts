import { Response } from "express";
import { NonPayloadResponse } from "./response.dto";

export interface AuthMiddlewareResponse extends Response<NonPayloadResponse> {}
