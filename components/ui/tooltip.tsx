"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover opacity-0  px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type ElegantTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

const ElegantTooltip = ({ children, content }: ElegantTooltipProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipProvider disableHoverableContent delayDuration={0.2}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {open && (
          <AnimatePresence>
            <TooltipPortal forceMount>
              <TooltipContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  {content}
                </motion.div>
              </TooltipContent>
            </TooltipPortal>
          </AnimatePresence>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export {
  Tooltip,
  TooltipPortal,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  ElegantTooltip,
};
