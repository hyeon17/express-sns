import { HTTP_STATUS } from "@/constants/httpStatus";

export const InvalidTokenError = {
  status: HTTP_STATUS.Unauthorized,
  status_text: HTTP_STATUS[HTTP_STATUS.Unauthorized],
  message: "Invalid Token",
};
