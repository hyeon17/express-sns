import { appDataBase } from "@/db";
import { User } from "@/entity";

export const userRepository = appDataBase.getRepository(User).extend({});
