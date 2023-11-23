import { prismaClient } from "..";
import { guestBook } from "@prisma/client";
import {
  type GuestbookDto,
  GuestbookDtoSchema,
  guestbookHashId,
} from "../dtos/guestbook.dto";

export const fetchGuestbookMessage = async ({ limit = 200 }) => {
  const messages = await prismaClient.guestBook.findMany({
    select: {
      id: true,
      userId: true,
      userInfo: true,
      message: true,
      createdAt: true,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return messages.map(({ id, ...rest }) => {
    return {
      id: guestbookHashId.encode(id),
      ...rest,
    };
  });
};
