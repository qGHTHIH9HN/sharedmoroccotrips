import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { ArrowUpRight, Compass, Phone, MessageCircle, ArrowRight } from "lucide-react";
const button =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#17362e] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#285646]";
function Brand() {
  return (
    <>
      <span className="grid size-12 place-items-center rounded-full border border-[#153e35]/20 bg-[#ede7da]">
        <Compass className="size-7 stroke-[1.25]" />
      </span>
      <span className="text-[14px] font-extrabold tracking-[0.12em] sm:text-[16px]">
        SHARED MOROCCO
        <span className="mt-1 block text-[8px] font-semibold tracking-[0.29em]">
          TRIPS
        </span>
      </span>
    </>
  );
}
export function Header() {
  return (
    <>
      <div className="flex items-center justify-between bg-[#17362e] px-6 py-3 text-[11px] tracking-wide text-white/85 sm:px-10 lg:px-14">
        <span>Locally planned. Shared with you.</span>
        <a className="flex items-center gap-2" href="tel:+212600454881">
          <Phone className="size-3" />
          +212 600 454 881
        </a>
      </div>
      <header className="relative z-30 mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-6 py-5 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Shared Morocco Trips home"
        >
          <Brand />
        </Link>
        <nav
          className="hidden items-center gap-8 text-[13px] font-semibold lg:flex"
          aria-label="Main navigation"
        >
          <Link className="transition hover:text-[#b34c2f]" href="/tours">
            Explore trips
          </Link>
          <Link
            className="transition hover:text-[#b34c2f]"
            href="/tours?category=Desert+tours"
          >
            Sahara journeys
          </Link>
          <Link
            className="transition hover:text-[#b34c2f]"
            href="/tours?category=Day+trips"
          >
            Day excursions
          </Link>
          <Link className="transition hover:text-[#b34c2f]" href="/blog">
            Journal
          </Link>
        </nav>
        <Link className={button + " hidden sm:inline-flex"} href="/contact-us">
          Plan your journey
          <ArrowUpRight className="size-4" />
        </Link>
        <MobileMenu />
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="bg-[#102f28] px-5 pt-16 pb-7 text-[#e8eee9] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link className="flex items-center gap-3" href="/">
            <Compass className="size-10 stroke-1" />
            <span className="text-lg font-bold tracking-[0.1em]">
              SHARED MOROCCO
              <span className="block text-[9px] tracking-[0.25em]">
                TRIPS
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">
            Shared roads. New friendships. A Morocco you’ll remember long after
            the journey home.
          </p>
        </div>
        <div>
          <h3 className="mb-6 text-xs font-semibold tracking-wider uppercase text-[#d8bc93]">
            Find your experience
          </h3>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <Link href="/tours">All tours & activities</Link>
            <Link href="/tours?category=Desert+tours">Sahara desert tours</Link>
            <Link href="/tours?category=Day+trips">
              Day trips from Marrakech
            </Link>
            <Link href="/blog">Travel journal</Link>
            <Link href="/contact-us">Our local team</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-6 text-xs font-semibold tracking-wider uppercase text-[#d8bc93]">
            A real person, a better plan
          </h3>
          <a
            className="mb-4 flex items-center gap-2 text-lg"
            href="tel:+212600454881"
          >
            <Phone className="size-4" />
            +212 600 454 881
          </a>
          <a
            className="text-sm text-white/70"
            href="mailto:Desertbrise@gmail.com"
          >
            Desertbrise@gmail.com
          </a>
          <p className="mt-4 text-xs leading-6 text-white/50">
            M’Hamid El Ghizlane
            <br />
            Zagora, Morocco
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-xs text-[#d8bc93]"
            href="/contact-us"
          >
            <MessageCircle className="size-4" />
            Let’s talk about your trip
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] text-white/45 sm:flex-row">
        <span>© {new Date().getFullYear()} Shared Morocco Trips</span>
        <div className="flex flex-wrap gap-5">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms & conditions</Link>
          <Link href="/cancellation-policy">Cancellation policy</Link>
        </div>
      </div>
    </footer>
  );
}
