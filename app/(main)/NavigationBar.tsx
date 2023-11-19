"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

const NavItem = ({ href, children }: NavItemProps) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block whitespace-nowrap px-3 py-2 transition",
          isActive
            ? "text-lime-600 dark:text-lime-400"
            : "hover:text-lime-600 dark:hover:text-lime-400"
        )}
      >
        {children}
        {isActive && (
          <motion.span className=" absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-lime-700/0 via-lime-700/70 to-lime-700/0 dark:from-lime-400/0 dark:via-lime-400/40 dark:to-lime-400/0"></motion.span>
        )}
      </Link>
    </li>
  );
};
