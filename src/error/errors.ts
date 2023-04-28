import { CommentNotFoundError } from "./CommentNotFoundError";
import { DuplicateUserError } from "./DuplicateUser";
import { InvalidFieldError } from "./InvalidFieldError";
import { InvalidHeaderError } from "./InvalidHeader";
import { InvalidTokenError } from "./InvalidTokenError";
import { LikeBadRequest } from "./LikeBadRequest";
import { LikeNotFoundError } from "./LikeNotFoundError";
import { NotFoundPostError } from "./NotFoundPostError";
import { NotFoundUserError } from "./NotFoundUserError";
import { UnauthorizedUserError } from "./UnauthorizedUser";

export const API_ERROR_LIST = {
  InvalidTokenError,
  InvalidHeaderError,
  NotFoundUserError,
  NotFoundPostError,
  CommentNotFoundError,
  InvalidFieldError,
  DuplicateUserError,
  UnauthorizedUserError,
  LikeBadRequest,
  LikeNotFoundError,
};

export type ApiErrorTypes = keyof typeof API_ERROR_LIST;
