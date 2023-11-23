import { NextRequest } from "next/server";

export const getIp = (req: Request | NextRequest) => {
  if ("ip" in req && req.ip) {
    return req.ip;
  }

  const xff = req.headers.get("x-forwarded-for");

  if (xff == "::1") {
    return "127.0.0.1";
  }
  return xff?.split(",")?.[0] ?? "127.0.0.1";
};
