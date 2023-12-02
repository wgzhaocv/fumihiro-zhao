import { Container } from "@/components/ui/container";
import { PostDetail } from "@/sanity/schemas/post";
import BlogTableOfContents from "./BlogTableOfContents";
import { Node } from "./BlogTableOfContents";
import BlogReactions from "./BlogReactions";

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
        <div className="max-w-2xl md:flex-1 md:shrink-0"></div>
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
