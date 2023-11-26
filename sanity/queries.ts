import { getDate } from "@/lib/date";
import { groq } from "next-sanity";
import { clientFetch } from "./lib/client";
import { Post } from "./schemas/post";

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
