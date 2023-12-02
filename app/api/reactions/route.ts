import { getIp } from "@/lib/ip";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextApiRequest } from "next";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const getKey = (id: string) => `reaction_${id}`;

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "10 s"),
  analytics: true,
});

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "No valid Post Id" }, { status: 400 });

    const { success } = await ratelimit.limit(getKey(id) + getIp(req));
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const values = await redis.get<number[]>(getKey(id));
    if (!values) {
      await redis.set(getKey(id), [0, 0, 0, 0]);
    }
    return NextResponse.json(values ?? [0, 0, 0, 0]);
  } catch (error) {
    return NextResponse.json({ error: "Server Errors" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const index = searchParams.get("index");
    if (!id || !index || !(parseInt(index) >= 0 && parseInt(index) < 4)) {
      return NextResponse.json({ error: "No valid Post Id" }, { status: 400 });
    }

    const { success } = await ratelimit.limit(getKey(id) + getIp(req));
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    let values = await redis.get<number[]>(getKey(id));
    if (!values) {
      values = [0, 0, 0, 0];
    }
    values[parseInt(index)]++;
    await redis.set(getKey(id), values);

    revalidateTag(getKey(id));
    return NextResponse.json({
      data: values,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Errors" }, { status: 500 });
  }
};
