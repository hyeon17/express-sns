import { HTTP_STATUS } from "@/constants/httpStatus";

export const UnauthorizedUserError = {
  status: HTTP_STATUS.Unauthorized,
  status_text: HTTP_STATUS[HTTP_STATUS.Unauthorized],
  message: "인증되지 않은 사용자 입니다.",
};
