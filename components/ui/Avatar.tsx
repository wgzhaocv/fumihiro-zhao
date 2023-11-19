import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";
import Potrait from "@/assets/me.png";
import { fullname } from "@/lib/seo";
import Image from "next/image";

const AvatarContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={clsx(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...props}
    />
  );
};

type AvatarImageProps = React.ComponentPropsWithoutRef<"a"> &
  Omit<LinkProps, "href"> & {
    large?: boolean;
    href?: string;
  };

const AvatarImage = ({
  className,
  large = false,
  href = "/",
  ...props
}: AvatarImageProps) => {
  return (
    <Link
      aria-label="Home Page"
      href={href}
      className={clsx("pointer-events-auto", className)}
      {...props}
    >
      <Image
        src={Potrait}
        alt={`${fullname}'s potrait`}
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-zin-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
};

export const Avatar = Object.assign(AvatarContainer, { Image: AvatarImage });
