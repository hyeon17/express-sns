import "@/util/loadEnv";
import * as cors from "cors";
import * as express from "express";
import { commentsRouter, postsRouter, authRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(
  process.env.NODE_ENV === "development"
    ? process.env.APP_SERVER_PORT
    : process.env.PORT || process.env.APP_SERVER_PORT,
  () => {
    console.log(`server listen on ${process.env.APP_SERVER_PORT}`);
  }
);
