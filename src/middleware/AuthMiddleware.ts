import { HTTP_STATUS } from "@/constants/httpStatus";
import { AuthMiddlewareResponse } from "@/dto/authMiddleware.dto";
import { ApiError } from "@/error/ApiError";
import { AuthUtil, TokenPayload } from "@/util/auth";
import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

export interface JwtRequest extends Request {
  decoded?: TokenPayload;
}

export class AuthMiddleware {
  static verifyToken(
    req: JwtRequest,
    res: AuthMiddlewareResponse,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        throw new ApiError("UnauthorizedUserError");
      }

      AuthUtil.verify(
        token,
        process.env.JWT_ACCESSTOKEN_SECRET,
        (error, decoded) => {
          if (error) {
            throw new ApiError("UnauthorizedUserError");
          }
          req.decoded = decoded;
        }
      );

      return next();
    } catch (error) {
      if (error instanceof ApiError) {
        const { status } = error;

        return res
          .status(status)
          .json({ ok: false, error: { ...error, message: error.message } });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }
}
