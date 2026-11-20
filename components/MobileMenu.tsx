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
        className="absolute inset-x-5 top-full flex flex-col gap-5 rounded-sm border border-[#33483c]/10 bg-[#ffffff] p-7 text-sm font-semibold shadow-2xl"
        aria-label="Mobile navigation"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a") && menu.current)
            menu.current.open = false;
        }}
      >
        <Link href="/tours">Explore all trips</Link>
        <Link href="/tours?category=Desert+tours">Sahara desert journeys</Link>
        <Link href="/tours?category=Day+trips">Day trips & excursions</Link>
        <Link href="/blog">Travel journal</Link>
        <Link
          className="rounded-sm bg-[#33483c] px-5 py-4 text-center text-white"
          href="/contact-us"
        >
          Plan your journey
        </Link>
      </nav>
    </details>
  );
}
