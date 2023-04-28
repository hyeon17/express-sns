import {
  body,
  param,
  query,
  checkExact,
  validationResult,
} from "express-validator";
import {
  EmailValidationConfig,
  PasswordValidationConfig,
  ProfileValidationConfig,
  UsernameValidationConfig,
} from "./validateFieldConfig";
import { Request, Response, NextFunction } from "express";
import { ApiValidator } from "@/util/ApiValidator";
import { ApiError } from "@/error/ApiError";
import { HTTP_STATUS } from "@/constants/httpStatus";

export class ValidateMiddleware {
  static validateJsonHeader(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers["content-type"]?.includes("application/json")) {
        throw new ApiError("InvalidHeaderError");
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.status).json({
          ok: false,
          error: {
            ...error,
            message: error.message,
          },
        });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }

  static validateUploadHeader(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers["content-type"]?.includes("multipart/form-data")) {
        throw new ApiError("InvalidHeaderError");
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.status).json({
          ok: false,
          error: {
            ...error,
            message: error.message,
          },
        });
      }

      return res
        .status(HTTP_STATUS.InternalServerError)
        .json({ ok: false, error });
    }
  }

  static confirm = {
    signup(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.signup(validationResult(req));

        next();
      } catch (error) {
        if (req?.file) {
          const file = req.file as Express.MulterS3.File;

          const { s3Commands } = require("@/util/uploadS3");

          s3Commands.delete({ bucket: file.bucket, key: file.key });
        }

        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    login(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.login(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    createPost(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.createPost(validationResult(req));

        next();
      } catch (error) {
        if (req?.file) {
          const file = req.file as Express.MulterS3.File;

          const { s3Commands } = require("@/util/uploadS3");

          s3Commands.delete({ bucket: file.bucket, key: file.key });
        }

        if (error instanceof ApiError) {
          return res
            .status(error.status)
            .json({ ok: false, error: { ...error, message: error.message } });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    getPosts(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.getPosts(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    getPost(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.getPost(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    updatePost(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.updatePost(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    deletePost(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.deletePost(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    like(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.like(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    createComment(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.createComment(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    updateComment(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.updateComment(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
    deleteComment(req: Request, res: Response, next: NextFunction) {
      try {
        ApiValidator.validate.deleteComment(validationResult(req));

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.status).json({ ok: false, error });
        }

        return res
          .status(HTTP_STATUS.InternalServerError)
          .json({ ok: false, error });
      }
    },
  };

  static signup = [
    checkExact(
      [
        body(...EmailValidationConfig.args.required).notEmpty(),
        body(...EmailValidationConfig.args.validFormat)
          .trim()
          .isEmail(),
        body(...PasswordValidationConfig.args.required).notEmpty(),
        body(...PasswordValidationConfig.args.validLength)
          .trim()
          .isLength({ ...PasswordValidationConfig.options.validLength }),
        body(...UsernameValidationConfig.args.required).notEmpty(),
        body(...UsernameValidationConfig.args.validLength)
          .trim()
          .isLength({ ...UsernameValidationConfig.options.validLength }),
        body(ProfileValidationConfig.key).custom((input, meta) => {
          if (meta.req.body?.profile === undefined) return true;

          if (!input) {
            const [_, message] = ProfileValidationConfig.args.required;
            throw new Error(message);
          }

          if (typeof input !== "string") {
            const [_, message] = ProfileValidationConfig.args.validFormat;
            throw new Error(message);
          }

          return true;
        }),
      ],
      { message: "허용한 요청 필드 외에 다른 필드가 포함되어있습니다." }
    ),
    this.confirm.signup,
  ];

  static login = [
    this.validateJsonHeader,
    checkExact(
      [
        body(...EmailValidationConfig.args.required).notEmpty(),
        body(...EmailValidationConfig.args.validFormat)
          .trim()
          .isEmail(),
        body(...PasswordValidationConfig.args.required).notEmpty(),
        body(...PasswordValidationConfig.args.validLength)
          .trim()
          .isLength({ ...PasswordValidationConfig.options.validLength }),
      ],
      { message: "허용한 요청 필드 외에 다른 필드가 포함되어있습니다." }
    ),
    this.confirm.login,
  ];

  static createPost = [
    checkExact(
      [
        body("content", "게시물에 대한 내용을 작성해주세요").notEmpty(),
        body("files").custom((input, meta) => {
          if (!meta.req?.file)
            throw new Error("업로드 이미지는 필수 입력 요소입니다");

          return true;
        }),
      ],
      { message: "허용한 요청 필드 외에 다른 필드가 포함되어있습니다." }
    ),
    this.confirm.createPost,
  ];

  static getPosts = [
    checkExact(
      [
        query(...UsernameValidationConfig.args.required).notEmpty(),
        query(...UsernameValidationConfig.args.validLength)
          .trim()
          .isLength({ ...UsernameValidationConfig.options.validLength }),
      ],
      { message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다." }
    ),
    this.confirm.getPosts,
  ];

  static getPost = [
    checkExact(
      [
        param("id", "id는 필수 파라미터 입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
      ],
      { message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다." }
    ),
    this.confirm.getPost,
  ];

  static updatePost = [
    checkExact(
      [
        param("id", "id는 필수 입력 요소입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
        body("content", "게시물에 대한 내용을 작성해주세요").notEmpty(),
        body("files").custom((input, meta) => {
          if (!meta.req?.file) return true;

          if (meta.req.file && typeof meta.req.file.location !== "string")
            throw new Error("업로드할 이미지가 없습니다");

          return true;
        }),
      ],
      { message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다." }
    ),
    this.confirm.updatePost,
  ];

  static deletePost = [
    checkExact(
      [
        param("id", "id는 필수 입력 요소입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
      ],
      {
        message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다.",
      }
    ),
    this.confirm.deletePost,
  ];

  static like = [
    checkExact(
      [
        param("id", "id는 필수 입력 요소입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
      ],
      {
        message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다.",
      }
    ),
    this.confirm.like,
  ];

  static createComment = [
    this.validateJsonHeader,
    checkExact(
      [
        body("postId", "포스트 아이디는 필수 입력 요소입니다.").notEmpty(),
        body("postId", "유효한 id 형식이 아닙니다.").isNumeric(),
        body("content", "댓글내용은 필수 입력 요소입니다.").notEmpty(),
      ],
      {
        message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다.",
      }
    ),
    this.confirm.createComment,
  ];

  static updateComment = [
    this.validateJsonHeader,
    checkExact(
      [
        param("id", "id는 필수 입력 요소입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
        body("content", "수정할 댓글 내용은 필수 입력 요소입니다.").notEmpty(),
      ],
      {
        message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다.",
      }
    ),
    this.confirm.updateComment,
  ];

  static deleteComment = [
    checkExact(
      [
        param("id", "id는 필수 입력 요소입니다.").notEmpty(),
        param("id", "유효한 id 형식이 아닙니다.").isNumeric(),
      ],
      {
        message: "허용한 파라미터 외에 다른 파라미터가 포함되어 있습니다.",
      }
    ),
    this.confirm.deleteComment,
  ];
}
