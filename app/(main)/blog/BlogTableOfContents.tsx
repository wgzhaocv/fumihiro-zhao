"use client";

import { PostDetail } from "@/sanity/schemas/post";
import clsx from "clsx";
import { Variants, motion, useScroll } from "framer-motion";
import React from "react";

type HeadingNode = {
  _type: "span";
  text: string;
  _key: string;
};

export type Node = {
  _type: "block";
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  _key: string;
  children?: HeadingNode[];
};

const parseOutline = (nodes: Node[]) => {
  return nodes
    .filter((node) => node.style.startsWith("h") && node._type === "block")
    .map((node) => {
      return {
        style: node.style,
        text: node?.children?.[0]?.text ?? "",
        id: node._key,
      };
    });
};

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delay: 0.2,
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
} satisfies Variants;

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
} satisfies Variants;

type BlogTableOfContentsProps = {
  headings: Node[];
};

const BlogTableOfContents = ({ headings }: BlogTableOfContentsProps) => {
  const outline = parseOutline(headings);
  const { scrollY } = useScroll();
  const [highlighedHeading, setHighlightedHeading] = React.useState<string>("");
  const articleEleRef = React.useRef<HTMLDivElement | null>(null);
  const headingElesRef = React.useRef<HTMLAnchorElement[]>([]);

  React.useEffect(() => {
    if (!articleEleRef.current) {
      articleEleRef.current = document.querySelector<HTMLDivElement>(
        "article[data-postid]"
      );
    }
    if (headingElesRef.current.length === 0) {
      headingElesRef.current = outline
        .map((item) => {
          return document.querySelector<HTMLAnchorElement>(
            `article ${item.style}:where([id="${item.id}"]) > a`
          );
        })
        .filter(Boolean) as HTMLAnchorElement[];
    }
    const handleSroll = () => {
      if (!articleEleRef.current) {
        articleEleRef.current = document.querySelector<HTMLDivElement>(
          "article[data-postid]"
        );
      }

      if (headingElesRef.current.length !== outline.length) {
        headingElesRef.current = outline
          .map((item) => {
            return document.querySelector<HTMLAnchorElement>(
              `article ${item.style}:where([id="${item.id}"]) > a`
            );
          })
          .filter(Boolean) as HTMLAnchorElement[];
      }

      if (
        !articleEleRef.current ||
        headingElesRef.current.length !== outline.length
      )
        return;

      const outlineTops = headingElesRef.current.map(
        (ele) => ele.getBoundingClientRect().top
      );

      if (scrollY.get() > articleEleRef.current.scrollHeight) {
        setHighlightedHeading("");
      } else {
        const index = outlineTops.findIndex((top) => top > 0);
        if (index === -1) {
          setHighlightedHeading(outline[outline.length - 1]?.id ?? "");
        } else {
          setHighlightedHeading(outline[index]?.id ?? "");
        }
      }
    };

    window.addEventListener("scroll", handleSroll);
    return () => window.removeEventListener("scroll", handleSroll);
  }, [outline, scrollY]);

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="group pointer-events-auto flex flex-col space-y-2 text-zinc-500"
    >
      {outline.map((item) => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          className={clsx(
            "text-[12px] font-medium leading-[18px] trasition-colors duration-300",
            item.style === "h3" && "ml-1",
            item.style === "h4" && "ml-2",
            highlighedHeading === item.id
              ? "text-zinc-900 dark:text-zinc-200"
              : "hover:text-zinc-700 dark:hover:text-zincc-400 group-hover:[&:not(:hover)]:text-zinc-400 dark:group-hover:[&:not(:hover)]:text-zinc-600"
          )}
          aria-label={
            highlighedHeading === item.id ? "current heading" : undefined
          }
        >
          <a href={`#${item.id}`} className="block w-full">
            {item.text}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
};
export default BlogTableOfContents;
