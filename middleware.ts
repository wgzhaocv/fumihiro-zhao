import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { getIp } from "./lib/ip";
import next from "next";
import countries from "@/lib/countries.json";
import { redis } from "./lib/redis";
import { keyValues } from "./config/kv";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

const beforeAuthMiddleware = async (req: NextRequest) => {
  const { geo, nextUrl } = req;

  try {
    let blockedIps: string[] = [];
    blockedIps = (await get<string[]>(`blocked_ips`)) ?? [];

    const ip = getIp(req);
    const isApi = nextUrl.pathname.startsWith("/api/");

    if (blockedIps.includes(ip)) {
      if (isApi) {
        return NextResponse.json({ error: "You are blocked" }, { status: 403 });
      }

      nextUrl.pathname = "/blocked";
      return NextResponse.rewrite(nextUrl);
    }

    if (nextUrl.pathname === "/blocked") {
      nextUrl.pathname = "/";
      return NextResponse.redirect(nextUrl);
    }

    // if (nextUrl.pathname === "/error") {
    //   nextUrl.pathname = "/";
    //   return NextResponse.rewrite(nextUrl);
    // }

    if (geo && !isApi && process.env.VERCEL_ENV === "production") {
      const { country, city } = geo;
      const countryInfo = countries.find((e) => e.cca2 === country);
      if (countryInfo) {
        const flag = countryInfo.flag;

        await redis.set(keyValues.currentVisitor, { country, city, flag, ip });
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    // nextUrl.pathname = "/error";
    // return NextResponse.redirect(nextUrl);
  }
};
export default authMiddleware({
  beforeAuth: beforeAuthMiddleware,
  publicRoutes: [
    "/",
    "/api(.*)",
    "/blog(.*)",
    "/confirm(.*)",
    "/projects",
    "/guestbook",
    "/newsletters(.*)",
    "/about",
    "/rss",
    "/feed",
    "/ama",
  ],
});
