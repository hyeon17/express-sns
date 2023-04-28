import { HTTP_STATUS } from "@/constants/httpStatus";
import { API_ERROR_LIST, ApiErrorTypes } from "./errors";

export class ApiError extends Error {
  type: "API_ERROR";
  status: HTTP_STATUS;
  status_text: string;
  payload?: Record<string, any>;

  constructor(errorType: ApiErrorTypes, errorPayload?: Record<string, any>) {
    if (errorType !== "InvalidFieldError") {
      const { status, status_text, message } = API_ERROR_LIST[errorType];

      super(message);

      this.type = "API_ERROR";
      this.status = status;
      this.status_text = status_text;

      return this;
    }

    const { status, status_text, message, payload } =
      API_ERROR_LIST["InvalidFieldError"](errorPayload);

    super(message);

    this.type = "API_ERROR";
    this.status = status;
    this.status_text = status_text;
    this.payload = payload;
  }
}
