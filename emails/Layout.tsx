import { emailConfig } from "@/config/email";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "./_components";
type LayoutProps = {
  previewText: string;
  children: React.ReactNode;
};
export default function Layout({ previewText, children }: LayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-zinc-50 pt-[32px] font-sans">
          <Container className="mx-auto my-[40px] w-[465px] max-w-[465px] rounded-2xl border border-solid border-zinc-100 bg-white px-[24px] py-[20px]">
            {children}
          </Container>
          <Container className="mx-auto mt-[32px] w-[465px]">
            <Hr className="mx-0 my-5" />
            <Section>
              <Img
                src={`${emailConfig.baseUrl}/me.png`}
                width={24}
                height={24}
                alt="zhao"
                className="mx-auto my-0"
              />
              <Text className="text-center">
                <Link
                  href="https://wgzhao.me"
                  className="text-zinc-700 underline"
                >
                  <strong>fumihiro zhao</strong>
                </Link>
                <br />a developer in Tokyo.
              </Text>
              <Text className="text-center">
                <Link
                  href="/github"
                  className="text-xs text-zinc-600 underline"
                >
                  Github
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
