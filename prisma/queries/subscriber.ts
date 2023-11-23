import { prismaClient } from "..";

export const getCountOfSubscriber = async () => {
  try {
    return await prismaClient.subscribers.count({
      where: {
        NOT: {
          subscribeAt: null,
        },
      },
    });
  } catch (e) {
    console.error(e);
    return 0;
  }
};
