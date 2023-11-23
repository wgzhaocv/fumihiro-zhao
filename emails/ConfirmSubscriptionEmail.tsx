import { Button, Heading, Hr, Img, Link, Section, Text } from "./_components";
import Layout from "./Layout";

const ConfirmSubscriptionEmail = ({ link = "link.com/confirm?fake-token" }) => {
  const previewText = "Do you confirm your subscription to my newsletter?";
  return (
    <Layout previewText={previewText}>
      <Section></Section>
    </Layout>
  );
};

export default ConfirmSubscriptionEmail;
