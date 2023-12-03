"use client";
import { prettifyNumber } from "@/lib/math";
import { PostDetail } from "@/sanity/schemas/post";
import clsx from "clsx";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type BlogReactionsProps = Pick<PostDetail, "_id" | "mood"> & {
  reactions?: number[];
};

function moodToReactions(mood: PostDetail["mood"]) {
  switch (mood) {
    case "happy":
      return ["claps", "tada", "confetti", "fire"];
    case "sad":
      return ["pray", "cry", "heart", "hugs"];
    default:
      return ["claps", "heart", "thumbs-up", "fire"];
  }
}

const BlogReactions = ({ _id, mood, reactions }: BlogReactionsProps) => {
  const mouseY = useMotionValue(Infinity);
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseY.set(e.clientY);
    },
    [mouseY]
  );

  const [cachedReactions, setCachedReactions] = useState<number[]>(
    reactions ?? [0, 0, 0, 0]
  );
  const onClick = useCallback(
    async (index: number) => {
      setCachedReactions((prev) => {
        const next = [...prev];
        next[index] += 1;
        return next;
      });
      try {
        const res = await fetch(`/api/reactions?id=${_id}&index=${index}`, {
          method: "PATCH",
        });
        const { data } = (await res.json()) as { data: number[] };
        setCachedReactions(data);
      } catch (error) {
        console.error(error);
      }
    },
    [_id]
  );
  return (
    <motion.div
      className={clsx(
        "pointer-events-auto flex w-12 flex-col items-center justify-center gap-8 rounded-3xl",
        "bg-gradient-to-b from-zinc-100/80 to-white/90 px-1 pb-8 pt-4 ring-1 ring-zinc-400/10",
        "backdrop-blur-lg dark:from-zinc-800/80 dark:to-zinc-950/80 dark:ring-zinc-500/10"
      )}
      onMouseMove={onMouseMove}
      onMouseLeave={() => mouseY.set(Infinity)}
      initial={{
        opacity: 0,
        y: 10,
        rotate: 90,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        delay: 1,
        duration: 0.55,
        damping: 15,
        stiffness: 180,
      }}
    >
      {moodToReactions(mood).map((reaction, index) => (
        <ReactICon
          key={reaction}
          y={mouseY}
          image={`/reactions/${reaction}.png`}
          count={cachedReactions[index]}
          onClick={() => onClick(index)}
        />
      ))}
    </motion.div>
  );
};

type ReactIConProps = {
  y: MotionValue<number>;
  image: string;
  count: number;
  onClick: () => void;
};

const ReactICon = ({ y, image, count, onClick }: ReactIConProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const distance = useTransform(y, (v) => {
    const { y, height } = btnRef.current?.getBoundingClientRect() ?? {
      y: 0,
      height: 0,
    };
    return v - (y + height / 2);
  });
  const heightSync = useTransform(distance, [-120, 0, 120], [30, 56, 30]);
  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });
  return (
    <motion.button
      ref={btnRef}
      type="button"
      style={{ height }}
      className="relative aspect-square h-8"
      whileTap={{ scale: 1.3 }}
      onClick={onClick}
    >
      <Image
        src={image}
        alt=""
        className="inline-block"
        priority
        fill
        unoptimized
        fetchPriority="high"
      />
      <span className="absolute -bottom-6 left-0 w-full flex items-center justify-center whitespace-nowrap text-[12px] font-semibold text-zinc-700/30 dark:text-zinc-200/25">
        {prettifyNumber(count)}
      </span>
    </motion.button>
  );
};

export default BlogReactions;
