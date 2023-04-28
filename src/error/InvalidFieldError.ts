import { HTTP_STATUS } from "@/constants/httpStatus";

export const InvalidFieldError = (
  errors?: Record<string, any> | undefined
) => ({
  status: HTTP_STATUS.BadRequest,
  status_text: HTTP_STATUS[HTTP_STATUS.BadRequest],
  message: "Invalid Fields",
  payload: errors ? { ...errors } : null,
});
