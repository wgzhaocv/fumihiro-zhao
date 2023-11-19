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
import React, { useRef } from "react";

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
                className="order-last mt-[calc(theme(spacing.16) - theme(spacing.3))]"
              ></div>
              <Container
                className={"top-0 order-last mb-3 pt-3"}
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
                        <Avatar.Image large className="block w-full h-full" />
                      </Avatar>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Container>
        </div>
      </motion.header>
    </>
  );
};
