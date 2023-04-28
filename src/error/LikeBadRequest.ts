import { HTTP_STATUS } from "@/constants/httpStatus";

export const LikeBadRequest = {
  status: HTTP_STATUS.Conflict,
  status_text: HTTP_STATUS[HTTP_STATUS.Conflict],
  message: "해당유저가 좋아요한 글입니다.",
};
