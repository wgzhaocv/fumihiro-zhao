import { emailConfig } from "@/config/email";
import { Button, Heading, Hr, Img, Link, Section, Text } from "./_components";
import Layout from "./Layout";
import { fullname } from "@/lib/seo";

const ConfirmSubscriptionEmail = ({ link = "link.com/confirm?fake-token" }) => {
  console.log("emailConfig.baseUrl", emailConfig.baseUrl, link);

  const previewText = "Do you confirm your subscription to my newsletter?";
  return (
    <Layout previewText={previewText}>
      <Section className="mt-[24px]">
        <Img
          src={`${emailConfig.baseUrl}/subscription-email-header.jpg`}
          width={250}
          height={130}
          alt="fumihiro zhao"
          className="mx-auto my-0"
        />
      </Section>
      <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] fond-bold text-black">
        Subscribe to {fullname}'s newsletter
      </Heading>
      <Text className="text-[14px] leading-[24px] text-black">Hello!</Text>
      <Text className="text-[14px] leading-[24px] text-black">
        To confirm your subscription to my newsletter, please click the button,
        thank you!
      </Text>
      <Section className="my-[32px] text-center">
        <Button
          pX={20}
          pY={12}
          href={link}
          className="rounded-xl bg-zinc-900 text-center text-[12px] font-semibold text-white no-underline"
        >
          Confirm Subscription
        </Button>
      </Section>
      <Text className="text-[14px] leading-[24px] text-black">
        Or copy and paste the following link into your browser:
        <br />
        <Link href={link} className="text-blue no-underline">
          {link}
        </Link>
        <Hr className="mx-0my-[26px] h-px w-full bg-zinc-100"></Hr>
        <Text className="text-[12px] leading-[24px] text-[#666666]">
          if you did not subscribe to this newsletter, please ignore this email.
        </Text>
      </Text>
    </Layout>
  );
};

export default ConfirmSubscriptionEmail;
