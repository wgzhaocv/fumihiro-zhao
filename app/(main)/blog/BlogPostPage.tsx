"use client";
import { Container } from "@/components/ui/container";
import { PostDetail } from "@/sanity/schemas/post";
import BlogTableOfContents from "./BlogTableOfContents";
import { Node } from "./BlogTableOfContents";
import BlogReactions from "./BlogReactions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";
import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  ScriptIcon,
  UTurnLeftIcon,
} from "@/assets";
import { motion } from "framer-motion";
import Image from "next/image";
import dayjs from "dayjs";
import Balancer from "react-wrap-balancer";
import { prettifyNumber } from "@/lib/math";
import Prose from "@/components/Prose";
import PostPortableText from "@/components/portableText/PostPortableText";

type BlogPostPageProps = {
  post: PostDetail;
  views: number;
  relatedViews: number[];
  reactions?: number[];
};

const BlogPostPage = ({
  post,
  views,
  relatedViews,
  reactions,
}: BlogPostPageProps) => {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="w-full md:flex md:justify-between xl:relative">
        <aside className="hidden w-[160px] shrink-0 lg:block">
          <div className="sticky top-2 pt-20">
            <BlogTableOfContents headings={post.headings as Node[]} />
          </div>
        </aside>
        <div className="max-w-2xl md:flex-1 md:shrink-0">
          <Link
            href={"/blog"}
            aria-label="back to blog main page"
            className={clsx(
              "group  font-light  mb-8 flex h-10 w-10 px-3 py-2 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5",
              "ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800",
              "dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0",
              "xl:-top-1.5 xl:left-0 xl:mt-0"
            )}
          >
            <UTurnLeftIcon className="h-8 w-8 stroke-zinc-500 transition group-hover:stroke-zinc-700  dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Link>
          <article data-postid={post._id}>
            <header
              className={clsx(
                "relative flex flex-col items-center pb-5 after:absolute after:-bottom-1 after:block after:h-px after:w-full after:rounded",
                "after:bg-gradient-to-r after:from-zinc-400/20 after:via-zinc-200/10 after:to-transparent",
                "dark:after:from-zinc-600/20 dark:after:via-zinc-700/10"
              )}
            >
              <motion.div
                initial={{
                  y: 10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="relative mb-7 w-full md:mb-12 md:w-[120%] aspect-[240/135]"
              >
                <Image
                  className="select-none rounded-2xl object-cover ring-1 ring-zinc-900/5 transition dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 md:rounded-3xl"
                  src={post.mainImg.asset.url}
                  alt={post.title}
                  placeholder="blur"
                  blurDataURL={post.mainImg.asset.lqip}
                  unoptimized
                  fill
                />
              </motion.div>
              <motion.div
                initial={{
                  y: 10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="w-full flex gap-6 items-center space-x-4 text-sm font-medium text-zinc-600/80"
              >
                <time
                  dateTime={post.publishedAt}
                  className="flex items-center space-x-1.5"
                >
                  <CalendarIcon />
                  <span>{dayjs(post.publishedAt)?.format("YYYY/MM/DD")}</span>
                </time>
                <span className="inline-flex items-center space-x-1.5">
                  <ScriptIcon />
                  <span>{post.categories.join(", ")}</span>
                </span>
              </motion.div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
                className="mt-6 w-full text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
              >
                <Balancer>{post.title}</Balancer>
              </motion.h1>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
                className="my-5 w-full text-sm font-medium text-zinc-500"
              >
                {post.description}
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
              >
                <span
                  className="inline-flex items-center space-x-1.5"
                  title={views.toString()}
                >
                  <CursorClickIcon />
                  <span>{prettifyNumber(views)} times clicked.</span>
                </span>
                <span className="inline-flex items-center space-x-1.5">
                  <HourglassIcon />
                  <span>{post.readingTime.toFixed(1)} minutes to read.</span>
                </span>
              </motion.div>
            </header>
            <Prose className="mt-8">
              <PostPortableText value={post.body} />
            </Prose>
          </article>
        </div>

        <aside className="hidden w-[90px] shrink-0 lg:block">
          <div className="sticky top-2 flex justify-end pt-20">
            <BlogReactions
              _id={post._id}
              mood={post.mood}
              reactions={reactions}
            />
          </div>
        </aside>
      </div>
    </Container>
  );
};
export default BlogPostPage;
