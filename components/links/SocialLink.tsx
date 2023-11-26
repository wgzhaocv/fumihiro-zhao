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
import Link, { LinkProps } from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Platform, socialItems } from "@/config/socialItems";
import { AnimatePresence, motion } from "framer-motion";

type IconType = (props: IconProps) => JSX.Element;

type SocialLinkProps = { platform?: Platform };

export const SocialLink = ({ platform, ...props }: SocialLinkProps) => {
  const [open, setOpen] = useState(false);
  const socialItem = socialItems.find((item) => item.label === platform);
  if (!socialItem) return null;
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Link
            href={socialItem.link}
            className="group -m-1 p-1"
            target="_blank"
            prefetch={false}
            aria-label={socialItem.label}
            {...props}
          >
            <socialItem.icon className="h-5 w-5 text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
          </Link>
        </TooltipTrigger>
        <AnimatePresence>
          {open && (
            <TooltipPortal forceMount>
              <TooltipContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="backdrop-blur"
                >
                  {socialItem.label}
                </motion.div>
              </TooltipContent>
            </TooltipPortal>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
};
