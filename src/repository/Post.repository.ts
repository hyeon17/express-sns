import { appDataBase } from "@/db";
import { Post } from "@/entity";

export const postRepository = appDataBase.getRepository(Post).extend({});
