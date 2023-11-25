import { AtomIcon, GitHubIcon, MailIcon, TwitterIcon } from "@/assets";

export const socialItems = [
  {
    icon: GitHubIcon,
    link: "https://github.com/wgzhaocv",
    label: "Github",
  },
  {
    icon: TwitterIcon,
    link: "https://twitter.com/PeanutsVincent",
    label: "Twitter",
  },
  {
    icon: MailIcon,
    link: "mailto:wgzhaocv@gmail.com",
    label: "Email",
  },
  {
    icon: AtomIcon,
    link: "",
    label: "RSS",
  },
] as const;

export type Platform = (typeof socialItems)[number]["label"];
