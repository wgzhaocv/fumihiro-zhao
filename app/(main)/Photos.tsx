"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import image1 from "@/assets/highlights/kazetachinu023.jpg";
import image2 from "@/assets/highlights/laputa034.jpg";
import image3 from "@/assets/highlights/mononoke023.jpg";
import image5 from "@/assets/highlights/mononoke024.jpg";

const images = [
  { src: image1, alt: "kazetachinu" },
  { src: image2, alt: "laputa" },
  { src: image3, alt: "mononoke" },
  { src: image5, alt: "mononoke3" },
];

export const Photos = () => {
  const [width, setWidth] = React.useState(0);
  const [isCompact, setIsCompact] = React.useState(false);
  const expandedWidth = React.useMemo(() => width * 1.38, [width]);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsCompact(true);
        return setWidth(window.innerWidth / 2 - 64);
      }
      setWidth(window.innerWidth / images.length - 4 * images.length);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className="mt-16 sm:mt-20"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <div className="-my-4 flex w-full snap-x snap-proximity scroll-pl-4 justify-start gap-4 overflow-x-auto px-4 py-4 sm:gap-6 md:justify-center md:overflow-x-hidden md:px-0">
        {images.map((image, idx) => {
          return (
            <motion.div
              key={image.alt}
              className="relative h-40 flex-none shrink-0 snap-start overflow-hidden rounded-xl bg-zinc-100 ring-2 ring-lime-800/20 dark:bg-zinc-800 dark:ring-lime-300/10 md:h-72 md:rounded-3xl"
              animate={{
                width,
                opacity: isCompact ? 1 : 0.8,
                rotate: idx % 2 === 0 ? 2 : -1,
              }}
              whileHover={
                isCompact
                  ? {}
                  : {
                      width: expandedWidth,
                      opacity: 1,
                    }
              }
              layout
            >
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 640px) 18rem, 11rem"
                className=" pointer-events-none object-cover select-none w-full h-full absolute inset-0 "
                priority
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
