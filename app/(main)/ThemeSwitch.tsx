"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, LightningIcon } from "@/assets";
import { useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

const themeMode = {
  light: {
    label: "Light Mode",
    value: "light",
    icon: SunIcon,
  },
  dark: {
    label: "Dark Mode",
    value: "dark",
    icon: MoonIcon,
  },
};

type themeModeTypeKey = keyof typeof themeMode;

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const ThemeIcon = useMemo(() => {
    return themeMode[theme as themeModeTypeKey].icon ?? LightningIcon;
  }, [theme]);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  if (!mounted) return null;

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="switch the theme"
            onClick={toggleTheme}
            className="group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          >
            <ThemeIcon className="h-6 w-6 stroke-zinc-500 p-0.5 transition group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-200" />
          </button>
        </TooltipTrigger>
        <AnimatePresence>
          {open && (
            <TooltipPortal forceMount>
              <TooltipContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {themeMode[theme as themeModeTypeKey].label ?? "System Mode"}
                </motion.div>
              </TooltipContent>
            </TooltipPortal>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
};
