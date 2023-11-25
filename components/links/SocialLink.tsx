"use client";
import {
  AtomIcon,
  BilibiliIcon,
  GitHubIcon,
  type IconProps,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/assets";
import { LinkProps } from "next/link";

type IconType = (props: IconProps) => JSX.Element;

type Platform = "github" | "twitter" | "mail" | "rss";
type PlatformInfo = {
  icon: IconType;
  platform: Platform;
  label: string;
};

type SocialLinkProps = { platform?: Platform } & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SocialLink = ({ platform, href, ...props }: SocialLinkProps) => {};
