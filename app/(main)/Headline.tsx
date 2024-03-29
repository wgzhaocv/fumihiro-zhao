"use client";

import { SocialLink } from "@/components/links/SocialLink";
import { socialItems } from "@/config/socialItems";
import { fullname } from "@/lib/seo";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export const Headline = () => {
  return (
    <div className="max-w-2xl">
      <motion.p
        className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 30,
          duration: 0.3,
          delay: 0.1,
        }}
      >
        <Balancer>
          {"I'm"} {fullname}, a software engineer in Tokyo, I use typescript,
          next.js, nest.js and other tools to build web applications.
          <br />I enjoy trying diffrent things and sharing my knowledge with
          others.😘
        </Balancer>
      </motion.p>
      <motion.div
        className="flex gap-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 30,
          duration: 0.3,
          delay: 0.1,
        }}
      >
        {socialItems.map((item) => {
          return <SocialLink key={item.label} platform={item.label} />;
        })}
      </motion.div>
    </div>
  );
};
