import { Request } from "express";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

interface KeyCallback {
  (error: Error | null, key?: string): void;
}

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const s3Commands = {
  delete({ bucket, key }: { bucket: string; key: string }) {
    const deleteCommand = new DeleteObjectCommand({ Bucket: bucket, Key: key });

    s3.send(deleteCommand);
  },
};

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: process.env.AWS_ACL,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: Request, file: Express.MulterS3.File, cb: KeyCallback) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});
