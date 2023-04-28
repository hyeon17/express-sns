import { appDataBase } from "@/db";
import { Like } from "@/entity";

export const likeRepository = appDataBase.getRepository(Like).extend({});
