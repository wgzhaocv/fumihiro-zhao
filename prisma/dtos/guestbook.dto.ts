import Hashids from "hashids";
import { z } from "zod";
import { guestBook } from "@prisma/client";

export const GuestbookDtoSchema = z.object({
  id: z.string(),
  message: z.string().min(1).max(600),
  userId: z.string(),
  userInfo: z.object({
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    imgUrl: z.string().nullable().optional(),
  }),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export type GuestbookDto = z.infer<typeof GuestbookDtoSchema>;
export const guestbookHashId = new Hashids("guestbook");
