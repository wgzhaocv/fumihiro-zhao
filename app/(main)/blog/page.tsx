import { SocialLink } from "@/components/links/SocialLink";
import { Container } from "@/components/ui/container";
import Balancer from "react-wrap-balancer";
import { BlogPosts } from "./BlogPosts";

const description = "I write my blog to share my knowledge and experience.";

export const metadata = {
  title: "My Blog",
  description,
  openGraph: {
    title: "My Blog",
    description,
  },
};

const Page = () => {
  return (
    <Container className="mt-16 md:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Welcome to my blog📃
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
        <p className="flex items-center">
          <SocialLink platform={"RSS"} />
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 md:gap-8">
        <BlogPosts limit={20} />
      </div>
    </Container>
  );
};

export default Page;
