import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./(main)/ThemeProvider";

import { fullname, seo } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: seo.url,
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000212" },
  ],
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: `${fullname}'s blog`,
    type: "website",
    url: "https://wgzhao.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="p-0 m-0 h-full font-sans antialiased"
        suppressHydrationWarning
      >
        <body className={"flex h-full flex-col"}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
