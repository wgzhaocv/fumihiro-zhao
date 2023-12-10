"use client";

import { PortableTextComponentProps } from "@portabletext/react";
import React from "react";
import { ClientOnly } from "../ClientOnly";

export const PortableTextCodeBlock = ({
  value,
}: PortableTextComponentProps<{
  _key: string;
  language: string;
  code: string;
  filename?: string;
}>) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }, [value.code]);
  return (
    <div
      data-blockid={value._key}
      data-filename={value.filename}
      className="group relative mr-3 md:mr-0 rounded-3xl border border-[--tw-prose-pre-border] dark:bg-zinc-800/80"
    >
      <ClientOnly>
        <>
          <div className="flex leading-6 relative text-xs text-slate-400">
            {Boolean(value.filename) && (
              <>
                <div className="mt-2 flex flex-none items-center border-b border-t border-b-emerald-700 border-t-transparent px-4 py-1 font-medium text-emerald-700 dark:border-b-emerald-200 dark:text-emerald-200">
                  {value.filename}
                </div>
                <div className="flex flex-auto overflow-hidden rounded-tr-3xl pt-2">
                  <div className="-mr-px flex-auto rounded-tl border border-zinc-300/40 bg-zinc-200/50 dark:border-zinc-500/30 dark:bg-zinc-700/50"></div>
                </div>
              </>
            )}
          </div>
        </>
      </ClientOnly>
    </div>
  );
};
