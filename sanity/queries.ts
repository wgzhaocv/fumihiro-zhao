import { getDate } from "@/lib/date";
import { groq } from "next-sanity";
import { clientFetch } from "./lib/client";
import { Post, PostDetail } from "./schemas/post";

export const getAllLastestPostsSlugQuries = () => groq`
*[_type=="post"]&&!(_id in path("drafts.**"))
&&publishedAt <= "${getDate().toISOString()}" 
&& defined(slug.current)] | order(publishedAt desc).slug.current`;

export const getAllLatestPostsSlug = () => {
  return clientFetch<string[]>(getAllLastestPostsSlugQuries());
};

type GetBlogPostsOptions = {
  limit?: number;
  offset?: number;
  forDisplay?: boolean;
};

export const getBlogPostsQueries = ({
  limit = 5,
  forDisplay = true,
  offset = 0,
}: GetBlogPostsOptions) => groq`
*[_type=="post" && !(_id in path("drafts.**"))
&& publishedAt <= "${getDate().toISOString()}"
&& defined(slug.current)] | order(publishedAt desc)[${offset}...${
  offset + limit - 1
}]{
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    description,
    publishedAt,
    readingTime,
    mainImg{
        _ref,
        asset->{
            url,
            ${
              forDisplay
                ? '"lqip":metadata.lqip,"dominant":metadata.palette.dominant,'
                : ""
            }
        }
    }
}
`;

export const getBlogPosts = (options: GetBlogPostsOptions) => {
  return clientFetch<Post[]>(getBlogPostsQueries(options));
};

export const getBlogPostQuery = groq`
*[_type=="post" && slug.current==$slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    description,
    publishedAt,
    readingTime,
    mood,
    body[]{
      ...,
      _type=="image" => {
        "url":asset->url,
        "lqip":asset->metadata.lqip,
        "dimensions":asset->metadata.dimensions,
        ...
      }
    },
    "headings":body[length(style)>1 && style match "h*"],
    mainImg{
        _ref,
        asset->{
            url,
            "lqip":metadata.lqip,
            "dominant":metadata.palette.dominant,
        }
    },
    "related":*[_type=="post" && slug.current!=$slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0 && !(_id in path("drafts.**"))]| order(publishedAt desc, _createdAt desc)[0..2]{
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->title,
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      },
    }
}
`;
export const getBlogPost = (slug: string) =>
  clientFetch<PostDetail | undefined>(getBlogPostQuery, { slug });
