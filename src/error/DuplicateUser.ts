import { HTTP_STATUS } from "@/constants/httpStatus";

export const DuplicateUserError = {
  status: HTTP_STATUS.Conflict,
  status_text: HTTP_STATUS[HTTP_STATUS.Conflict],
  message: "이미 등록된 이메일 또는 유저이름입니다",
};
