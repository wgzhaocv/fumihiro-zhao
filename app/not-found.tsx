"use client";

import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { url } from "@/lib";
import Link from "next/link";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <main className="h-screen">
      <div className=" absolute inset-0 w-full h-full "></div>
      <div className=" pointer-events-none absolute inset-0 flex items-center justify-center flex-col h-full w-full">
        <motion.h1
          className="select-none text-[35vmin] font-bold text-white mix-blend-overlay"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          404
        </motion.h1>
        <Link
          href={"/"}
          className=" pointer-events-auto select-none text-xl font-bold text-white mix-blend-difference hover:underline"
        >
          Return To Home
        </Link>
      </div>
    </main>
  );
}
