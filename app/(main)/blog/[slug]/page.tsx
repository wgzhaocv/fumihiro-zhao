import { keyValues } from "@/config/kv";
import { url } from "@/lib";
import { redis } from "@/lib/redis";
import { getBlogPost } from "@/sanity/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "../BlogPostPage";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();
  const { title, description, mainImg } = post;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: mainImg.asset.url,
        },
      ],
      type: "article",
    },
  } satisfies Metadata;
};

const Blog = async ({ params }: { params: { slug: string } }) => {
  const post = await getBlogPost(params.slug);
  // console.log(post);
  if (!post) return notFound();

  let views = 3333;
  if (process.env.NODE_ENV === "production") {
    views = await redis.incr(keyValues.postViews(post._id));
  }
  let reactions: number[] = [];
  try {
    if (process.env.NODE_ENV === "production") {
      const res = await fetch(url(`/api/reactions?id=${post._id}`), {
        next: {
          tags: [`reactions:${post._id}`],
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) reactions = data;
    } else {
      reactions = [2, 3, 4, 5];
    }
  } catch (error) {
    console.error(error);
  }
  let relatedViews: number[] = [];
  if (Array.isArray(post.related) && post.related.length > 0) {
    if (process.env.NODE_ENV === "production") {
      const relatedKeys = post.related.map(({ _id }) =>
        keyValues.postViews(_id)
      );
      relatedViews = await redis.mget<number[]>(...relatedKeys);
    } else {
      relatedViews = post.related.map(() => ~~(Math.random() * 1000));
    }
  }
  return (
    <BlogPostPage
      post={post}
      views={views}
      relatedViews={relatedViews}
      reactions={reactions}
    />
  );
};

export const revalidate = 60;

export default Blog;
