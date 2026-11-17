"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useRef } from "react";
export default function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={menu}
      className="group lg:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape" && menu.current) menu.current.open = false;
      }}
    >
      <summary
        className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-stone-200"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </summary>
      <nav
        className="absolute inset-x-5 top-full flex flex-col gap-5 rounded-2xl border border-stone-200 bg-[#faf9f5] p-6 text-sm shadow-xl"
        aria-label="Mobile navigation"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a") && menu.current)
            menu.current.open = false;
        }}
      >
        <Link href="/tours">All experiences</Link>
        <Link href="/tours?category=Desert+tours">Sahara tours</Link>
        <Link href="/tours?category=Day+trips">Day trips</Link>
        <Link href="/blog">Travel journal</Link>
        <Link href="/contact-us">Talk to our local team</Link>
      </nav>
    </details>
  );
}
