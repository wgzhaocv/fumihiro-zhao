"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

export const PortableTextImage = ({
  value,
}: {
  value: {
    _key: string;
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
    lqip?: string;
    label?: string;
    alt?: string;
  };
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const hasLabel = React.useMemo(
    () => value.label && value.label.length > 0,
    [value.label]
  );
  return (
    <div data-id={value._key} className="group relative pr-3 md:pr-0">
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        {isZoomed && (
          <div
            className="relative"
            style={{
              width: value.dimensions.width,
              height: value.dimensions.height,
            }}
          />
        )}
        <AnimatePresence>
          {!isZoomed && (
            <div
              className={
                hasLabel ? "rounded-2xl bg-zinc-100 p-2 dark:bg-zinc-800" : ""
              }
            >
              <motion.div className="relative" layoutId={`image_${value._key}`}>
                <DialogTrigger>
                  <Image
                    src={value.url}
                    alt={value.alt ?? ""}
                    width={value.dimensions.width}
                    height={value.dimensions.height}
                    placeholder={value.lqip ? "blur" : "empty"}
                    blurDataURL={value.lqip}
                    className={clsx(
                      "relative z-20 cursor-zoom-in dark:brightness-75 dark:transition-[filter] dark:hover:brightness-100 rounded-xl",
                      !hasLabel && "md:rounded-3xl"
                    )}
                    fetchPriority="high"
                  />
                </DialogTrigger>
              </motion.div>
              {hasLabel && (
                <span className=" flex w-full items-center justify-center text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {value.label}
                </span>
              )}
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isZoomed && (
            <DialogPortal forceMount>
              <DialogClose className="fixed inset-0 z-50 h-screen w-screen cursor-zoom-out flex items-center justify-center">
                <DialogOverlay asChild>
                  <motion.div
                    className="absolute inset-0 bg-black/50"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  />
                </DialogOverlay>
                <DialogContent className="w-full overflow-hidden">
                  <div className="relative flex aspect-[3/2] items-center justify-center">
                    <div className="relative flex aspect-[3/2] w-full max-w-7xl items-center">
                      <motion.div
                        layoutId={`image_${value._key}`}
                        className=" absolute inset-0"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          duration: 0.5,
                        }}
                      >
                        <Image
                          src={value.url}
                          alt={value.alt ?? ""}
                          width={value.dimensions.width}
                          height={value.dimensions.height}
                          placeholder={value.lqip ? "blur" : "empty"}
                          blurDataURL={value.lqip}
                          className={clsx(
                            "mx-auto h-full overflow-hidden object-contain"
                          )}
                          unoptimized
                        />
                      </motion.div>
                    </div>
                  </div>
                </DialogContent>
              </DialogClose>
            </DialogPortal>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
};
