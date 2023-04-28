import { Exclude } from "class-transformer";
import { Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";
import { Like } from "./Like.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(4, 10)
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Length(8, 16)
  password: string;

  @Column({ nullable: true })
  profile?: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
