import { HTTP_STATUS } from "@/constants/httpStatus";

export const NotFoundUserError = {
  status: HTTP_STATUS.NotFound,
  status_text: HTTP_STATUS[HTTP_STATUS.NotFound],
  message: "존재하지 않는 사용자 입니다.",
};
