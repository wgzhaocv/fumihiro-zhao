"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import va from "@vercel/analytics";

import { useForm } from "react-hook-form";
import { useCallback, useId, useState } from "react";
import { useReward } from "react-rewards";
import clsx from "clsx";
import { TiltedSendIcon } from "@/assets";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";

export const newsLetterFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(1),
  formId: z.string().min(1),
});
export type NewsLetterForm = z.infer<typeof newsLetterFormSchema>;

export const NewsLetter = ({ subCount }: { subCount?: number }) => {
  const formId = useId();
  const { register, handleSubmit, formState, reset } = useForm<NewsLetterForm>({
    defaultValues: { formId },
    resolver: zodResolver(newsLetterFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const [subcribed, setSubcribed] = useState(false);
  const { reward } = useReward("newsLetter-reward", "emoji", {
    position: "absolute",
    emoji: ["🤓", "😊", "🥳", "🤩", "🤪", "🤯", "🥰", "😎", "🤑", "🤗", "😇"],
    elementCount: 32,
  });

  const onSubmit = useCallback(
    async (data: NewsLetterForm) => {
      try {
        if (isSubmitting) return;
        va.track("Newsletter:Subscribe");
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (response.ok) {
          reset();
          reward();
          setSubcribed(true);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [isSubmitting, reset, reward]
  );
  return (
    <form
      className={clsx(
        "relative rounded-2xl border border-zinc-100 p-6 transition-opacity dark:border-zinc-700/40",
        isSubmitting && "opacity-70 pointer-events-none"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" className="hidden" {...register("formId")} />
      <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <TiltedSendIcon className="h-5 w-5 flex-none" />
        <span>Get My Newsletters</span>
      </h2>
      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
        <span>Subscribe to support my work! 🫶</span>
        <br />
        {Boolean(subCount) && (
          <span>
            Join other <span className="font-medium">{subCount}</span>
            subscribers,
          </span>
        )}
        <span> you can unsubscribe anytime.</span>
      </p>
      <AnimatePresence>
        {!subcribed ? (
          <motion.div
            className="mt-6 flex h-10 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <input
              type="email"
              placeholder={"example@example.com"}
              aria-label="Email for newsletter"
              required
              className="min-w-0 flex-auto appearance-none rounded-lg border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-zinc-400 focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-lime-400/50 dark:focus:ring-lime-400/5 sm:text-sm"
              {...register("email")}
            />

            <Button
              type="submit"
              className="flex-none bg-white text-zinc-800 font-bold"
            >
              Subscribe
            </Button>
          </motion.div>
        ) : (
          <motion.p
            className="mt-6 h-10 text-center text-lg text-zinc-700 dark:text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Balancer>
              Please check your email to confirm your subscription.🥳
            </Balancer>
          </motion.p>
        )}
      </AnimatePresence>
      <span id="newsLetter-reward" className="relative h-0 w-0" />
      {errors.email && (
        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {errors.email.message}
        </p>
      )}
    </form>
  );
};
