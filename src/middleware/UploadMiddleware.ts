import { upload } from "@/util/uploadS3";
import { ValidateMiddleware } from "./ValidateMiddleware";

export const UploadMiddleware = {
  signup: [ValidateMiddleware.validateUploadHeader, upload.single("profile")],
  post: [ValidateMiddleware.validateUploadHeader, upload.single("files")],
};
