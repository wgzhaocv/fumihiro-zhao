import { CursorClickIcon, UsersIcon } from "@/assets";
import { Container } from "@/components/ui/container";
import { keyValues } from "@/config/kv";
import { navigationItems } from "@/config/navItems";
import { prettifyNumber } from "@/lib/math";
import { redis } from "@/lib/redis";
import { getCountOfSubscriber } from "@/prisma/queries/subscriber";
import Link from "next/link";
import { NewsLetter } from "./NewsLetter";
import { fullname } from "@/lib/seo";
import React from "react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="transition hover:text-lime-500 dark:hover:text-lime-400"
    >
      {children}
    </Link>
  );
};

const Links = () => {
  return (
    <nav className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      {navigationItems.map((item) => {
        return (
          <NavLink href={item.href} key={item.href}>
            {item.text}
          </NavLink>
        );
      })}
    </nav>
  );
};

const TotalPageViews = async () => {
  let views = 999999;
  if (process.env.VERCEL_ENV === "production") {
    views = await redis.incr(keyValues.totalPageViews);
  }
  return (
    <span className=" flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zin-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat("en-US").format(views)} views`}>
        Total Views&nbsp;
        <span className="font-medium">{prettifyNumber(views)}</span>
      </span>
    </span>
  );
};

type Geolocation = {
  country: string;
  city?: string;
  flag: string;
  ip?: string;
};

const VisitorGeolocation = async () => {
  let lastVisitor: Geolocation | undefined = undefined;
  if (process.env.VERCEL_ENV === "production") {
    try {
      const [lv, cv] = await redis.mget<Geolocation[]>(
        keyValues.lastVisitor,
        keyValues.currentVisitor
      );
      lastVisitor = lv;
      await redis.set(keyValues.lastVisitor, cv);
    } catch (error) {
      console.error(error);
    }
  }
  if (!lastVisitor) {
    lastVisitor = {
      country: "Solar System",
      city: "Earth",
      flag: "🌍",
    };
  }
  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <CursorClickIcon className="w-4 h-4" />
      <span>
        The Lat Visitor came from &nbsp;
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(", ")}
      </span>
      <span className="font-medium">{lastVisitor.flag}</span>
    </span>
  );
};

export const Footer = async () => {
  const subcribersCounts = await getCountOfSubscriber();
  return (
    <footer className="mt-32">
      <Container.Outter>
        <div className="boeder-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="mx-auto mb-8 max-w-md">
              <NewsLetter subCount={subcribersCounts} />
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <p className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
                &copy; {new Date().getFullYear()}&nbsp;{fullname}
              </p>
              <Links />
            </div>
          </Container.Inner>
          <Container.Inner className="mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-start gap-2">
              <React.Suspense>
                <TotalPageViews />
              </React.Suspense>
              <React.Suspense>
                <VisitorGeolocation />
              </React.Suspense>
            </div>
          </Container.Inner>
        </div>
      </Container.Outter>
    </footer>
  );
};
