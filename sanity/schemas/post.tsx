import { PencilSwooshIcon } from "@/assets";
import { defineField, defineType } from "sanity";
import { z } from "zod";
import { readingTimeType } from "./types/readingTime";

export const Post = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  mainImg: z.object({
    _ref: z.string(),
    asset: z.object({
      url: z.string(),
      lqip: z.string().optional(),
      domain: z
        .object({ background: z.string(), foreground: z.string() })
        .optional(),
    }),
  }),
  publishedAt: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  body: z.any(),
  readingTime: z.number(),
  mood: z.enum(["happy", "sad", "neutral"]),
});

export type Post = z.infer<typeof Post>;
export type PostDetail = Post & {
  heading: unknown[];
  related?: Post[];
};

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: PencilSwooshIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImg",
      title: "Main image",
      type: "image",
      description: "This image will be used on the blog preview",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: readingTimeType.name,
      options: {
        source: "body",
      },
    }),
    defineField({
      name: "mood",
      title: "Mood",
      type: "string",
      options: {
        list: [
          { title: "Neutral", value: "neutral" },
          { title: "Happy", value: "happy" },
          { title: "Sad", value: "sad" },
        ],
        layout: "radio",
      },
    }),
  ],

  initialValue: () => ({
    publishedAt: new Date().toISOString(),
    mood: "neutral",
  }),
  preview: {
    select: {
      title: "title",
      author: "slug",
      media: "mainImg",
    },
  },
});
