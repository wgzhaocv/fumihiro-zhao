import { Container } from "@/components/ui/container";
import { UserButton } from "@clerk/nextjs";
import { Headline } from "./Headline";
import { Photos } from "./Photos";
import { PencilSwooshIcon } from "@/assets";
import { BlogPosts } from "./blog/BlogPosts";
import { NewsLetter } from "./NewsLetter";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Headline />
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-6 pt-6">
            <h1 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span>Recent Articles</span>
            </h1>
            <BlogPosts />
          </div>
          <aside className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
            <NewsLetter />
          </aside>
        </div>
      </Container>
    </>
  );
}
