import Link from "next/link";
import {
  Route,
  ArrowUpRight,
  MessageCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
export function Header() {
  return (
    <header className="relative z-30 border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="Shared Morocco Trips home"
          className="flex items-center gap-2.5"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[#ff6435] text-white">
            <Route className="size-6 stroke-[2.5]" />
          </span>
          <span className="text-lg leading-[1.05] font-extrabold tracking-[-0.06em] text-slate-950">
            shared<span className="text-[#e94b1d]">morocco</span>
            <span className="mt-1 block text-[9px] font-medium tracking-[0.22em] text-slate-500 uppercase">
              Trips worth sharing
            </span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 text-[13px] font-semibold text-slate-600 lg:flex"
        >
          <Link className="hover:text-[#e94b1d]" href="/tours">
            Find a trip
          </Link>
          <Link
            className="hover:text-[#e94b1d]"
            href="/tours?category=Desert+tours"
          >
            Desert tours
          </Link>
          <Link
            className="hover:text-[#e94b1d]"
            href="/tours?category=Day+trips"
          >
            Day trips
          </Link>
          <Link
            className="hover:text-[#e94b1d]"
            href="/tours?category=Activities"
          >
            Things to do
          </Link>
          <Link className="hover:text-[#e94b1d]" href="/blog">
            Travel guides
          </Link>
        </nav>
        <Link
          href="/contact-us"
          className="hidden items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-semibold text-white transition hover:bg-slate-700 sm:inline-flex"
        >
          <MessageCircle className="size-4" />
          Ask a local
          <ArrowUpRight className="size-3.5" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
          >
            <Route className="size-6 text-[#ed592e]" />
            sharedmorocco
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
            Your next Morocco story starts here. Shared tours, local knowledge
            and more ways to explore.
          </p>
          <Link
            href="/contact-us"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#df4a20]"
          >
            Let’s find your trip
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider">
            Explore Morocco
          </h3>
          <div className="flex flex-col gap-3 text-sm text-slate-500">
            <Link href="/tours">All experiences</Link>
            <Link href="/tours?category=Desert+tours">Desert tours</Link>
            <Link href="/tours?category=Day+trips">Day trips</Link>
            <Link href="/tours?category=Activities">Activities</Link>
            <Link href="/blog">Travel guides</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider">
            We’re here to help
          </h3>
          <a
            href="tel:+212600454881"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Phone className="size-4" />
            +212 600 454 881
          </a>
          <a
            className="mt-3 block text-sm text-slate-500"
            href="mailto:Desertbrise@gmail.com"
          >
            Desertbrise@gmail.com
          </a>
          <p className="mt-5 text-xs leading-6 text-slate-400">
            M’Hamid El Ghizlane, Zagora
            <br />
            Morocco
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-5 py-6 text-[11px] text-slate-400 sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Shared Morocco Trips</span>
        <div className="flex gap-5">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/cancellation-policy">Cancellation</Link>
        </div>
      </div>
    </footer>
  );
}
