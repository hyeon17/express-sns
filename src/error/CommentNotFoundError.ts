import { HTTP_STATUS } from "@/constants/httpStatus";

export const CommentNotFoundError = {
  status: HTTP_STATUS.NotFound,
  status_text: HTTP_STATUS[HTTP_STATUS.NotFound],
  message: "요청한 댓글을 찾을 수 없습니다.",
};
