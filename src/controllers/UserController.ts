import { validationResult } from "express-validator";
import { HTTP_STATUS } from "@/constants/httpStatus";
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from "@/dto";
import { VerifyRequestDto, VerifyResponseDto } from "@/dto/verify.dto";
import { ApiError } from "@/error/ApiError";
import { userRepository } from "@/repository/User.repository";
import { AuthUtil, TokenPayload } from "@/util/auth";

export class UserController {
  static async signup(req: SignupRequestDto, res: SignupResponseDto) {
    try {
      const { email, password, username } = req.body;
      const profileImg = req?.file;

      const isExist = await userRepository.findOne({
        where: [{ username }, { email }],
      });

      if (isExist) {
        throw new ApiError("DuplicateUserError");
      }

      const newUser = userRepository.create({
        email,
        password: await AuthUtil.generatePassword(password),
        username,
        ...(profileImg && { profile: profileImg.location }),
      });

      const accessToken = AuthUtil.generateAccessToken({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        ...(profileImg && { profile: newUser.profile }),
      });

      console.log(AuthUtil.decode(accessToken));

      const tokenPayload = AuthUtil.decode(accessToken) as TokenPayload;

      const createdUser = await userRepository.save(newUser);

      return res.status(HTTP_STATUS.Created).json({
        ok: true,
        payload: {
          content: {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            ...(createdUser?.profile && { profile: createdUser.profile }),
            iat: tokenPayload.iat,
            exp: tokenPayload.exp,
          },
          accessToken,
        },
      });
    } catch (error) {
      if (req?.file) {
        const file = req.file as Express.MulterS3.File;

        const { s3Commands } = require("@/util/uploadS3");

        s3Commands.delete({ bucket: file.bucket, key: file.key });
      }

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

  static async login(req: LoginRequestDto, res: LoginResponseDto) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          profile: true,
        },
      });

      if (!user) throw new ApiError("NotFoundUserError");

      const isEqualPassword = await AuthUtil.isEqualPassword(
        password,
        user.password
      );

      if (!isEqualPassword) throw new ApiError("NotFoundUserError");

      const accessToken = AuthUtil.generateAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
        ...(user.profile && { profile: user.profile }),
      });

      const tokenPayload = AuthUtil.decode(accessToken) as TokenPayload;

      return res.json({
        ok: true,
        payload: {
          content: {
            id: user.id,
            email: user.email,
            username: user.username,
            ...(user.profile && { profile: user.profile }),
            iat: tokenPayload.iat,
            exp: tokenPayload.exp,
          },
          accessToken,
        },
      });
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

  static verify(req: VerifyRequestDto, res: VerifyResponseDto) {
    try {
      if (!req?.decoded) throw new ApiError("InvalidTokenError");

      const { iat, exp, ...toeknPayload } = req.decoded;

      return res.json({ ok: true, payload: { user: { ...toeknPayload } } });
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
