import { HTTP_STATUS } from "@/constants/httpStatus";

export const LikeNotFoundError = {
  status: HTTP_STATUS.NotFound,
  status_text: HTTP_STATUS[HTTP_STATUS.NotFound],
  message: "해당 유저 또는 글을 찾을 수 없습니다.",
};
