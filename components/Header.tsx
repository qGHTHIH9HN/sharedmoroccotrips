import Link from "next/link";
import { ArrowUpRight, Phone, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
export function Header() {
  return (
    <header className="relative z-30 border-b border-[#243b32]/10 bg-[#f8f7f2]">
      <div className="mx-auto flex h-24 max-w-[1480px] items-center justify-between gap-8 px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          aria-label="Shared Morocco Trips home"
          className="flex flex-col items-center text-[#293c32]"
        >
          <span className="font-serif text-[25px] leading-none tracking-[0.02em] sm:text-[30px]">
            Shared Morocco
          </span>
          <span className="mt-2 text-[8px] font-medium tracking-[0.39em] uppercase">
            Journeys in good company
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 text-[11px] font-medium text-[#3d493f] lg:flex"
        >
          <Link className="hover:text-[#9a7747]" href="/tours">
            Our journeys
          </Link>
          <Link
            className="hover:text-[#9a7747]"
            href="/tours?category=Desert+tours"
          >
            The Sahara
          </Link>
          <Link
            className="hover:text-[#9a7747]"
            href="/tours?category=Day+trips"
          >
            Day escapes
          </Link>
          <Link className="hover:text-[#9a7747]" href="/blog">
            The journal
          </Link>
        </nav>
        <Link
          href="/contact-us"
          className="hidden items-center gap-7 border border-[#33483c]/30 px-5 py-3 text-[10px] font-medium tracking-wide text-[#33483c] transition hover:bg-[#33483c] hover:text-white sm:inline-flex"
        >
          Plan your journey
          <ArrowUpRight className="size-3.5" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="bg-[#253a30] px-6 pt-16 pb-7 text-[#eeeae0] md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-serif text-4xl">
            Shared Morocco
          </Link>
          <p className="mt-5 max-w-xs text-xs leading-7 text-[#c5cbbf]">
            From the Atlas to the Atlantic, shared journeys with a local
            perspective.
          </p>
        </div>
        <div>
          <h3 className="mb-6 text-[9px] tracking-[0.2em] uppercase text-[#c1a67a]">
            Explore
          </h3>
          <div className="flex flex-col gap-3 text-xs text-[#d8ddd3]">
            <Link href="/tours">All journeys</Link>
            <Link href="/tours?category=Desert+tours">Sahara desert tours</Link>
            <Link href="/tours?category=Day+trips">Day escapes</Link>
            <Link href="/tours?category=Activities">Local experiences</Link>
            <Link href="/blog">The journal</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-6 text-[9px] tracking-[0.2em] uppercase text-[#c1a67a]">
            Start a conversation
          </h3>
          <a
            href="tel:+212600454881"
            className="flex items-center gap-2 text-sm"
          >
            <Phone className="size-3.5" />
            +212 600 454 881
          </a>
          <a
            className="mt-4 block text-xs text-[#d8ddd3]"
            href="mailto:Desertbrise@gmail.com"
          >
            Desertbrise@gmail.com
          </a>
          <p className="mt-5 text-[11px] leading-6 text-[#adb9ab]">
            M’Hamid El Ghizlane, Zagora
            <br />
            Morocco
          </p>
          <Link
            href="/contact-us"
            className="mt-6 inline-flex items-center gap-5 border-b border-white/30 pb-2 text-[11px]"
          >
            Tell us about your trip
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[9px] text-[#b7c0b2]">
        <span>© {new Date().getFullYear()} Shared Morocco Trips</span>
        <div className="flex gap-6">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/cancellation-policy">Cancellation</Link>
        </div>
      </div>
    </footer>
  );
}
