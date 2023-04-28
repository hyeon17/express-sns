import { HTTP_STATUS } from "@/constants/httpStatus";

export const NotFoundPostError = {
  status: HTTP_STATUS.NotFound,
  status_text: HTTP_STATUS[HTTP_STATUS.NotFound],
  message: "요청한 글을 찾을 수 없습니다.",
};
