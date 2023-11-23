import { redis } from "@/lib/redis";
import { prismaClient } from "@/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterFormSchema = z.object({
  email: z.string().email().min(1),
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "10 s"),
  analytics: true,
});

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    const success = await rateLimit.limit("subscribe_" + (req.ip ?? ""));
    if (!success) {
      return NextResponse.error();
    }
  }

  try {
    const { data } = await req.json();
    const parsedData = newsletterFormSchema.parse(data);
    const subscriber = await prismaClient.subscribers.findFirst({
      where: {
        email: parsedData.email,
      },
    });
    if (subscriber) {
      return NextResponse.json({ status: "success" });
    }

    const token = crypto.randomUUID();
  } catch (error) {}
};
