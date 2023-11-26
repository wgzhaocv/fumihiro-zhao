import { keyValues } from "@/config/kv";
import { redis } from "@/lib/redis";
import { getBlogPosts } from "@/sanity/queries";
import BlogPostCard from "./BlogPostCard";

type BlogPostProps = {
  limit?: number;
  offset?: number;
};

export const BlogPosts = async ({ limit = 5, offset = 0 }: BlogPostProps) => {
  const posts = await getBlogPosts({ limit, offset, forDisplay: true });
  const postKeys = posts.map(({ _id }) => keyValues.postViews(_id));

  let views: number[] = [];
  if (process.env.NODE_ENV === "development") {
    views = postKeys.map(() => ~~(Math.random() * 1000));
  } else {
    views = await redis.mget<number[]>(...postKeys);
  }

  return (
    <>
      {posts.map((post, i) => {
        return (
          <BlogPostCard post={post} views={views[i] ?? 0} key={post._id} />
        );
      })}
    </>
  );
};
