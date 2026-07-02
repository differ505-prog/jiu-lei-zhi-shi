"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookOpenText, FlaskConical, Grape, Martini } from "lucide-react";

const navigation = [
  {
    href: "/spirits",
    label: "烈酒圖鑑",
    icon: Martini,
  },
  {
    href: "/wines",
    label: "葡萄酒窖",
    icon: Grape,
  },
  {
    href: "/sakes",
    label: "清酒紀行",
    icon: BookOpenText,
  },
  {
    href: "/mixology",
    label: "調酒實驗室",
    icon: FlaskConical,
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/10 text-amber-200 transition-transform duration-200 group-hover:-translate-y-0.5">
              <Martini className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-lg tracking-[0.08em] text-stone-100">
                Amber Archive
              </p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                酒類知識庫與品飲筆記
              </p>
            </div>
          </Link>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-400 lg:inline-flex">
            深色閱讀優先
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          {navigation.map(({ href, label, icon: Icon }) => (
            (() => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex min-w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm transition duration-200 ${
                    active
                      ? "border-amber-400/30 bg-amber-500/14 text-stone-50 shadow-[0_8px_30px_rgba(245,158,11,0.08)]"
                      : "border-white/10 bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-amber-500/8 hover:text-stone-50"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active ? "text-amber-100" : "text-amber-300"
                    }`}
                  />
                  {label}
                </Link>
              );
            })()
          ))}
        </nav>
      </div>
    </header>
  );
}
