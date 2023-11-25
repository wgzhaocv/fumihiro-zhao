import { Container } from "@/components/ui/container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className=" h-screen flex items-center justify-center">
      <SignUp />
    </Container>
  );
}
