import { HTTP_STATUS } from "@/constants/httpStatus";

export const InvalidHeaderError = {
  status: HTTP_STATUS.BadRequest,
  status_text: HTTP_STATUS[HTTP_STATUS.BadRequest],
  message: "Invalid Header",
};
