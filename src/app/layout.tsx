import type { Metadata } from "next";
import { Noto_Sans_TC, Playfair_Display } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amber Archive | 酒類知識庫與品飲筆記",
  description:
    "以本地 Markdown 建構的高質感酒類知識庫，收錄烈酒、葡萄酒、清酒與調酒實作筆記。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${playfair.variable} ${notoSansTc.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(120,53,15,0.18),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_26%)]" />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {children}
          </main>
          <footer className="border-t border-white/8 bg-black/20">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
              <p className="font-serif text-base text-stone-200">
                Amber Archive
              </p>
              <p>以深色閱讀體驗整理烈酒、葡萄酒、清酒與調酒筆記的高質感知識庫。</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
