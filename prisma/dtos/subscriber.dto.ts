import Hashids from "hashids";
import { z } from "zod";

export const SubscriberDtoSchema = z.object({
  id: z.string(),
  email: z.string().email().max(120),
  token: z.string().max(50),
  subscribeAt: z.date().or(z.string()),
  unsubscribeAt: z.date().or(z.string()).nullable().optional(),
});

export type SubscriberDto = z.infer<typeof SubscriberDtoSchema>;
export const subscriberHashId = new Hashids("subscriber");
