import Hashids from "hashids";
import { z } from "zod";

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  body: z.object({
    blockId: z.string().optional(),
    text: z.string().min(1),
  }),
  userInfo: z.object({
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    imgUrl: z.string().nullable().optional(),
  }),
  parentId: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CommentDto = z.infer<typeof commentSchema>;
export type CommentDtoWithoutPostId = Omit<CommentDto, "postId">;
export const commentHashId = new Hashids("comment");
