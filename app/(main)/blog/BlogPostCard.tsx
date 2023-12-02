import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  ScriptIcon,
} from "@/assets";
import { prettifyNumber } from "@/lib/math";
import { Post } from "@/sanity/schemas/post";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type BlogPostCardProps = {
  post: Post;
  views: number;
};
const BlogPostCard = ({ post, views }: BlogPostCardProps) => {
  const {
    title,
    description,
    mainImg,
    slug,
    publishedAt,
    categories,
    readingTime,
  } = post;
  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={false}
      className={
        "group relative flex w-full transform-gpu flex-col rounded-3xl bg-transparent ring-2 ring-[--post-image-bg] transition-transform hover:-translate-y-0.5"
      }
      style={
        {
          "--post-image-bg": mainImg.asset.dominant?.background,
          "--post-image-fg": mainImg.asset.dominant?.foreground,
          "--post-image": `url(${mainImg.asset.url})`,
        } as React.CSSProperties
      }
    >
      <div className="relative aspect-[300/235] w-full">
        <Image
          src={mainImg.asset.url}
          alt={title}
          className=" rounded-t-3xl object-cover"
          placeholder="blur"
          blurDataURL={mainImg.asset.lqip}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw"
        />
      </div>
      <span
        className={clsx(
          "relative z-10 flex w-full flex-1 shrink-0 flex-col justify-between gap-0.5 rounded-b-[calc(1.5rem+1px)] px-3 py-2",
          "bg-cover bg-bottom bg-no-repeat bg-blend-overlay  [background-image:var(--post-image)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none before:rounded-b-[calc(1.5rem-1px)] before:bg-[--post-image-bg] before:opacity-70 before:transition-opacity",
          "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none after:rounded-b-[calc(1.5rem-1px)] after:bg-gradient-to-b after:from-transparent after:to-[--post-image-bg] after:backdrop-blur after:transition-opacity group-hover:before:opacity-30 "
        )}
      >
        <h2 className="z-20 text-base font-bold tracking-tight text-[--post-image-fg] opacity-70 transition-opacity group-hover:opacity-100 md:text-xl">
          {title}
        </h2>
        <span className="relative z-20 flex flex-col justify-between opacity-50 transition-opacity group-hover:opacity-80">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-[--post-image-fg] md:text-sm">
              <CalendarIcon />
              <span>{dayjs(new Date(publishedAt)).format("YYYY/MM/DD")}</span>
            </span>
            {Array.isArray(categories) && (
              <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-[--post-image-fg] md:text-sm">
                <ScriptIcon />
                <span>{categories.join(", ")}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3 text-[12px] font-medium text-[--post-image-fg] md:text-xs">
            <span className="inline-flex items-center space-x-1">
              <CursorClickIcon />
              <span>{prettifyNumber(views)}</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <HourglassIcon />
              <span>{readingTime.toFixed(1)} minutes to read</span>
            </span>
          </div>
        </span>
      </span>
    </Link>
  );
};

export default BlogPostCard;
