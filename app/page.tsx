import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  catalogue,
  image,
  money,
  hasPrice,
  route,
  text,
  Row,
} from "@/lib/content";
const wrap = "mx-auto max-w-[1360px] px-6 sm:px-9 lg:px-12";
function Mark() {
  return (
    <svg
      viewBox="0 0 80 36"
      aria-hidden="true"
      className="h-8 w-16 shrink-0 fill-none stroke-[#9e351a] stroke-[1.7]"
    >
      <path
        d="M2 32 20 15l13 11M20 15l7 5L46 3l32 29"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Card({ tour: s }: { tour: Row }) {
  return (
    <Link
      href={route(s)}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#9e351a]"
    >
      <div className="relative mb-4 aspect-[1.05] overflow-hidden bg-[#e7dfd2]">
        <Image
          src={
            image(s.featured_image) ||
            image("public/assets/images/intent/marrakech/sahara-morocco.jpg")
          }
          alt={s.title}
          fill
          sizes="(max-width:640px) 100vw,33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
      </div>
      <p className="mb-2 font-sans text-[10px] font-medium tracking-[0.06em] text-[#9e351a] uppercase">
        {s.duration} ·{" "}
        {s.group_type === "group"
          ? "Shared group"
          : s.group_type === "private"
            ? "Private tour"
            : "Morocco experience"}
      </p>
      <h3 className="mb-2 font-serif text-[29px] leading-[1.07] tracking-[-0.02em] text-[#37180f] transition group-hover:text-[#9e351a] lg:text-[32px]">
        {s.title}
      </h3>
      <p className="mb-3 line-clamp-3 font-serif text-[19px] leading-[1.2] text-[#4c3429]">
        {text(s.excerpt)}
      </p>
      <div className="mb-4 flex items-baseline gap-1.5 font-sans text-[10px] text-[#795e4c]">
        {hasPrice(s) && <span>From</span>}
        <strong className="font-medium text-[#9e351a]">{money(s)}</strong>
        {hasPrice(s) && <span>per person</span>}
      </div>
      <span className="inline-flex items-center gap-3 font-serif text-[21px] text-[#9e351a]">
        Discover the journey
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
export default async function Home() {
  const c = await catalogue();
  const slugs = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-essaouira-day-trip-marrakech-camel-ride",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ];
  const selected = slugs
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  return (
    <div className="bg-[#f7f0e4] font-serif text-[#37180f]">
      <header className="border-b border-[#9e351a]/10">
        <div
          className={
            wrap +
            " flex min-h-[76px] flex-wrap items-center justify-between gap-x-5 gap-y-3 py-3"
          }
        >
          <Link
            href="/"
            aria-label="Shared Morocco Trips home"
            className="flex items-center gap-3"
          >
            <Mark />
            <span className="text-[23px] leading-none sm:text-[27px]">
              Shared Morocco Trips
            </span>
          </Link>
          <nav
            aria-label="Homepage navigation"
            className="hidden items-center gap-10 text-[20px] md:flex"
          >
            <a href="#journeys" className="hover:text-[#9e351a]">
              Our journeys
            </a>
            <a href="#local-team" className="hover:text-[#9e351a]">
              Our team
            </a>
            <Link href="/contact-us" className="hover:text-[#9e351a]">
              Contact
            </Link>
          </nav>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 rounded-md border border-[#9e351a] px-4 py-2 text-[18px] text-[#9e351a] transition hover:bg-[#9e351a] hover:text-[#f7f0e4] sm:px-5"
          >
            Plan my journey
            <ArrowUpRight className="size-4" />
          </Link>
          <nav
            aria-label="Mobile homepage navigation"
            className="flex w-full justify-center gap-9 border-t border-[#9e351a]/10 pt-3 text-[18px] md:hidden"
          >
            <a href="#journeys">Our journeys</a>
            <a href="#local-team">Our team</a>
            <Link href="/contact-us">Contact</Link>
          </nav>
        </div>
      </header>
      <main id="main" className="pb-0!">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#4b2411] sm:min-h-[570px]">
          <Image
            src={
              image("public/assets/images/intent/marrakech/sahara-morocco.jpg")
            }
            alt="Evening light across the dunes of the Moroccan Sahara"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_50%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#271207]/85 via-[#391a09]/35 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#2d1305]/35 to-transparent" />
          <div className={wrap + " relative w-full py-12 text-[#fff8ee]"}>
            <p className="mb-6 font-sans text-[10px] font-medium tracking-[0.28em] uppercase sm:text-xs">
              Sahara · Atlas · Atlantic coast
            </p>
            <h1 className="mb-6! max-w-2xl font-serif! text-[78px]! font-normal! leading-[0.83]! tracking-[-0.02em]! text-[#fff8ee] sm:text-[106px]! lg:text-[126px]!">
              Morocco,
              <br />
              <span className="italic text-[#ef9f64]">together.</span>
            </h1>
            <p className="mb-6 max-w-[490px] font-serif text-[23px] leading-[1.18] text-[#fff8ee] sm:text-[27px]">
              From the Sahara dunes to the Atlantic coast,
              <br className="hidden sm:block" /> discover Morocco with a local
              team.
            </p>
            <a
              href="#journeys"
              className="inline-flex items-center gap-4 rounded-sm bg-[#f7f0e4] px-6 py-3 font-serif text-[23px] text-[#37180f] transition hover:bg-white"
            >
              Discover our journeys
              <ArrowDown className="size-4" />
            </a>
          </div>
        </section>
        <div className="border-b border-[#a88a6b]/50">
          <div
            className={
              wrap +
              " grid gap-4 py-5 text-center font-serif text-[21px] leading-none sm:grid-cols-3 sm:gap-0 sm:text-[23px]"
            }
          >
            <span className="sm:border-r sm:border-[#a88a6b]">
              Local Moroccan team
            </span>
            <span className="sm:border-r sm:border-[#a88a6b]">
              Shared tours & private options
            </span>
            <span>Sahara, cities & coast</span>
          </div>
        </div>
        <section
          id="journeys"
          className={wrap + " scroll-mt-6 pt-10 pb-12 sm:pt-12 sm:pb-14"}
        >
          <h2 className="mb-8! font-serif! text-[43px]! font-normal! leading-[0.97]! tracking-[-0.025em]! text-[#37180f] sm:text-[62px]!">
            Choose your{" "}
            <span className="italic text-[#9e351a]">next journey.</span>
          </h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-5">
            {selected.map((s) => (
              <Card tour={s} key={s.id} />
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link
              href="/tours"
              className="inline-flex items-center gap-5 border-b border-[#9e351a]/40 pb-2 font-serif text-[21px] text-[#9e351a]"
            >
              Explore all tours & experiences
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
        <section
          id="local-team"
          className="scroll-mt-6 bg-[#454737] text-[#fcf6e9]"
        >
          <div
            className={
              wrap +
              " grid items-center gap-7 py-9 md:grid-cols-[1fr_1fr] md:gap-16 md:py-10"
            }
          >
            <h2 className="mb-0! font-serif! text-[45px]! font-normal! leading-[0.94]! tracking-[-0.02em]! text-[#fcf6e9] sm:text-[60px]!">
              With the people
              <br />
              who call it <span className="italic text-[#efa267]">home.</span>
            </h2>
            <p className="font-serif text-[24px] leading-[1.16] text-[#fcf6e9] md:border-l md:border-[#d5c9ad]/70 md:py-3 md:pl-14">
              Local knowledge, a personal welcome and thoughtfully planned
              routes—for a journey through Morocco that feels human from the
              start.
            </p>
          </div>
        </section>
        <section className={wrap + " py-10 text-center sm:py-12"}>
          <h2 className="mb-6! font-serif! text-[42px]! font-normal! leading-none! tracking-[-0.025em]! text-[#37180f] sm:text-[59px]!">
            Shall we plan your journey?
          </h2>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-4 rounded-sm bg-[#a43617] px-9 py-3 font-serif text-[24px] leading-none text-[#fff7ec] transition hover:bg-[#85280f]"
          >
            Contact our team
            <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </main>
      <footer className={wrap}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-t border-[#a88a6b]/60 py-5">
          <Link href="/" className="flex items-center gap-3 text-[21px]">
            <Mark />
            Shared Morocco Trips
          </Link>
          <nav
            aria-label="Footer navigation"
            className="flex gap-6 text-[18px]"
          >
            <a href="#journeys">Our journeys</a>
            <a href="#local-team">Our team</a>
            <Link href="/contact-us">Contact</Link>
          </nav>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 rounded-md border border-[#9e351a] px-4 py-2 text-[18px] text-[#9e351a]"
          >
            Plan my journey
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pb-5 font-sans text-[9px] text-[#8a705a]">
          <span>© {new Date().getFullYear()} Shared Morocco Trips</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-and-conditions">Terms</Link>
            <Link href="/cancellation-policy">Cancellation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
