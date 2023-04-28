import { appDataBase } from "@/db";
import { Comment } from "@/entity/Comment.entity";

export const commentRepository = appDataBase.getRepository(Comment).extend({});
