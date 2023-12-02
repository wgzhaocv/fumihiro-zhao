import { UFOIcon } from "@/assets";
import { Container } from "@/components/ui/container";

const Loading = () => {
  return (
    <Container className="relative mt-16 md:mt-32 h-screen min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className=" animate-pulse text-5xl text-zinc-500/50">
          <UFOIcon className="h-20 w-20" />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
