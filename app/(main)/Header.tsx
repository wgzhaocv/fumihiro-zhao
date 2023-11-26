"use client";
import { Avatar } from "@/components/ui/Avatar";
import { Container } from "@/components/ui/container";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import { NavigationBar } from "./NavigationBar";
import { ThemeSwitch } from "./ThemeSwitch";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { GitHubBrandIcon, GoogleBrandIcon, UserArrowLeftIcon } from "@/assets";
import { url } from "@/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clamp } from "@/lib/math";

export const Header = () => {
  const isHome = usePathname() === "/";
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isInitial = useRef(true);

  const avatarX = useMotionValue(0);
  const avatarScale = useMotionValue(1);
  const avatarBorderX = useMotionValue(0);
  const avatarBorderScale = useMotionValue(1);

  const avatarTransform = useMotionTemplate`translate3d(${avatarX}rem, 0, 0) scale(${avatarScale})`;
  const avatarBorderTransform = useMotionTemplate`translate3d(${avatarBorderX}rem, 0, 0) scale(${avatarBorderScale})`;

  const [isShowingAltAvatar, setIsShowingAltAvatar] = React.useState(false);
  const onAvatarContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsShowingAltAvatar((prev) => !prev);
    },
    []
  );

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0;
    const upDelay = 64;
    const setProperty = (prop: string, value: string | null) => {
      document.documentElement.style.setProperty(prop, value);
    };

    const removeProperty = (prop: string) => {
      document.documentElement.style.removeProperty(prop);
    };

    const updateHeaderStyles = () => {
      if (!headerRef.current) return;

      const { top, height } = headerRef.current.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) {
        setProperty("--header-position", "sticky");
      }

      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);

        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY > downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--avatar-top");
        removeProperty("--header-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--avatar-top", "0px");
        setProperty("--header-top", "0px");
      }
    };

    const updateAvatarStyles = () => {
      if (!isHome) {
        return;
      }

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      avatarX.set(x);
      avatarScale.set(scale);

      const borderScale = 1 / (toScale / scale);

      avatarBorderX.set((-toX + x) * borderScale);
      avatarBorderScale.set(borderScale);

      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    };

    const setHeaderStyle = () => {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    };

    window.addEventListener("scroll", setHeaderStyle, { passive: true });
    window.addEventListener("resize", setHeaderStyle);

    return () => {
      window.removeEventListener("scroll", setHeaderStyle);
      window.removeEventListener("resize", setHeaderStyle);
    };
  }, [isHome]);

  return (
    <>
      <motion.header
        layout
        layoutRoot
        className={clsx(
          "pointer-events-none relative z-50 mb-[var(--header-mb,0)] flex flex-col",
          isHome
            ? "h-[var(--header-height,180px)]"
            : "h-[var(--header-height,64px)]"
        )}
      >
        <AnimatePresence>
          {isHome && (
            <>
              <div
                ref={avatarRef}
                className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
              ></div>
              <Container
                className={"top-0 order-last -mb-3 pt-3"}
                style={{
                  position:
                    "var(--header-position)" as React.CSSProperties["position"],
                }}
              >
                <motion.div
                  className={
                    "w-full select-none top-[var(--avatar-top,theme(spacing.3))]"
                  }
                  style={{
                    position:
                      "var(--header-inner-position)" as React.CSSProperties["position"],
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                >
                  <motion.div
                    className="relative inline-flex"
                    layoutId="avatar"
                    layout
                  >
                    <motion.div
                      className="absolute left-0 top-3 origin-left transition-opacity opacity-[var(--avatar-border-opacity,0)]"
                      style={{ transform: avatarBorderTransform }}
                    >
                      <Avatar />
                    </motion.div>
                    <motion.div
                      className="block h-16 w-16 origin-left"
                      style={{ transform: avatarTransform }}
                    >
                      <Avatar.Image large className="block w-full h-full" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Container>
            </>
          )}
        </AnimatePresence>
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container className="w-full top-[var(--header-top,theme(spacing.6))]">
            <div className="flex relative gap-4">
              <motion.div
                className="flex flex-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                }}
              >
                <AnimatePresence>
                  {!isHome && (
                    <motion.div layoutId="avatar" layout>
                      <Avatar>
                        <Avatar.Image />
                      </Avatar>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="flex flex-1 justify-end md:justify-center">
                <NavigationBar.Mobile className="pointer-events-auto relative z-50 md:hidden" />
                <NavigationBar.Desktop className="pointer-events-auto relative z-50 hidden md:block" />
              </div>
              <motion.div
                className="flex justify-end gap-3 md:flex-1"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <UserInfo />
                <div className=" pointer-events-auto">
                  <ThemeSwitch />
                </div>
              </motion.div>
            </div>
          </Container>
        </div>
      </motion.header>
      {isHome && <div className="h-[--content-offset]" />}
    </>
  );
};

const UserInfo = () => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <AnimatePresence>
      <SignedIn key="user-info">
        <motion.div
          className=" pointer-events-auto flex items-center relative h-10"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <UserButton
            afterSignOutUrl={url(pathname).href}
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-white/20",
              },
            }}
          />
        </motion.div>
      </SignedIn>
      <SignedOut key="sign-in">
        <motion.div
          className=" pointer-events-auto"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <TooltipProvider disableHoverableContent>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <SignInButton mode="modal" redirectUrl={url(pathname).href}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={clsx(
                      "h-10 rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90",
                      "px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur",
                      "transition dark:from-zinc-900/50 dark::to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                    )}
                  >
                    <UserArrowLeftIcon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
              </SignInButton>
              <AnimatePresence>
                {tooltipOpen && (
                  <TooltipPortal forceMount>
                    <TooltipContent asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                      >
                        Log In
                      </motion.div>
                    </TooltipContent>
                  </TooltipPortal>
                )}
              </AnimatePresence>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </SignedOut>
    </AnimatePresence>
  );
};
