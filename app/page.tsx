import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  MapPin,
  Compass,
  Users,
  Check,
  MessageCircle,
} from "lucide-react";
import { catalogue, category, image } from "@/lib/content";
import TourCard from "@/components/TourCard";
const wrap = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12";
const eyebrow =
  "mb-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#a44327]";
const button =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#b34c2f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#913c24]";
export default async function Home() {
  const c = await catalogue();
  const popular = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-desert-tour-marrakech-to-fes-3-days",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ]
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const trips = c.services
    .filter((s) => category(s) === "Day trips")
    .slice(0, 3);
  return (
    <main id="main">
      <section className="relative mx-2 min-h-[640px] overflow-hidden rounded-[28px] bg-[#153e35] text-white sm:mx-5 sm:rounded-[36px] lg:mx-7 lg:min-h-[720px]">
        <div className="absolute inset-0">
          <Image
            src={image(
              "public/assets/images/intent/marrakech/sahara-morocco.jpg",
            )}
            alt="Golden Sahara dunes in southern Morocco"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#071d19]/95 via-[#102b23]/65 to-black/15" />
          <div className="absolute inset-0 bg-linear-to-t from-[#102b23]/30 to-transparent" />
        </div>
        <div
          className={
            wrap + " relative pt-24 pb-44 sm:pt-32 sm:pb-48 lg:pt-40 lg:pb-52"
          }
        >
          <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[9px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm">
            <Compass className="size-3.5" />
            Shared journeys. Local knowledge.
          </span>
          <h1 className="max-w-3xl font-serif text-[52px]! leading-[1.02]! tracking-[-0.045em]! text-white sm:text-7xl! lg:text-[94px]!">
            Discover Morocco.
            <br />
            <span className="text-[#f0d4a5] italic">Share the journey.</span>
          </h1>
          <p className="mt-7 max-w-[390px] text-sm leading-7 text-white/80 sm:text-base">
            From the Sahara dunes to the Atlas Mountains, explore thoughtfully planned small-group journeys with local insight, clear itineraries and room for discovery.
          </p>
          <Link
            className="mt-7 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-medium text-white"
            href="/tours"
          >
            Explore our journeys
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="absolute right-7 bottom-20 hidden items-center gap-3 text-[9px] tracking-[0.18em] text-white/70 uppercase md:flex">
          <span className="h-px w-9 bg-white/50" />
          The Sahara, southern Morocco
        </div>
      </section>
      <div className={wrap + " relative z-10 -mt-12"}>
        <form
          action="/tours"
          className="grid gap-5 rounded-[24px] border border-stone-200/60 bg-white p-6 shadow-2xl shadow-[#153e35]/15 sm:p-8 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-8"
        >
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-wide text-[#153e35]">
              <MapPin className="size-3.5" />
              Where would you like to go?
            </span>
            <input
              className="w-full border-0 bg-transparent py-1 text-sm text-stone-600 outline-offset-4 placeholder:text-stone-400"
              name="q"
              placeholder="Merzouga, Essaouira, Agafay…"
            />
          </label>
          <label className="block border-t border-stone-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-7">
            <span className="mb-2 block text-[10px] font-semibold tracking-wide">
              Your kind of experience
            </span>
            <select
              className="w-full bg-transparent py-1 text-sm text-stone-500 outline-offset-4"
              name="category"
            >
              <option value="">Explore everything</option>
              {[
                "Desert tours",
                "Day trips",
                "Activities",
                "Agafay",
                "Morocco circuits",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <button className={button} type="submit">
            <Search className="size-4" />
            Find my trip
          </button>
        </form>
      </div>
      <div
        className={
          wrap +
          " grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stone-200/70 py-9 text-[10px] font-medium text-stone-500 sm:text-xs md:grid-cols-4"
        }
      >
        {[
          "Locally planned journeys",
          "Transparent tour information",
          "Shared and private travel",
          "Talk directly to our team",
        ].map((s) => (
          <span className="flex items-center justify-center gap-2" key={s}>
            <Check className="size-3.5 text-[#a44327]" />
            {s}
          </span>
        ))}
      </div>
      <section className={wrap + " py-16 lg:py-24"}>
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className={eyebrow}>
              <span className="h-px w-7 bg-[#a44327]" />
              Start with the Sahara
            </span>
            <h2 className="mb-0! font-serif text-[38px]! leading-[1.1]! sm:text-5xl!">
              Journeys worth taking.
              <br />
              <span className="text-[#9c593b] italic">
                Memories worth sharing.
              </span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="mb-5 text-sm leading-7 text-stone-500">
              Through the Atlas, past the kasbahs and into the dunes. Choose the
              journey that fits your days.
            </p>
            <Link
              className="inline-flex items-center gap-3 text-xs font-semibold"
              href="/tours?category=Desert+tours"
            >
              Explore Sahara tours
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="bg-[#f0eee6] py-16 lg:py-20">
        <div className={wrap}>
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className={eyebrow}>
                Explore by experience
              </span>
              <h2 className="mb-0! text-[38px]! sm:text-5xl!">
                Your Morocco, your way.
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-3 text-xs font-semibold"
              href="/tours"
            >
              Browse all experiences
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[
              [
                "Desert tours",
                "Follow the dunes",
                "public/assets/images/intent/marrakech/merzouga.jpg",
              ],
              [
                "Day trips",
                "A day beyond the city",
                "public/assets/images/intent/agadir/essaouira.webp",
              ],
              [
                "Morocco circuits",
                "Take the longer road",
                "public/assets/images/intent/tangier/chefchaouen.jpg",
              ],
              [
                "Activities",
                "Make a little discovery",
                "public/assets/images/destinations/marrakech.webp",
              ],
            ].map(([cat, label, src]) => (
              <Link
                className="group relative h-64 overflow-hidden rounded-2xl sm:h-80"
                href={`/tours?category=${encodeURIComponent(cat)}`}
                key={cat}
              >
                <Image
                  src={image(src)}
                  alt={cat}
                  fill
                  sizes="(max-width:1024px) 50vw,25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#102b23]/85 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <span className="mb-2 block text-[9px] tracking-wide text-white/75">
                    {label}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                      {cat}
                    </h3>
                    <ArrowUpRight className="size-5 shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={wrap + " py-16 lg:py-24"}>
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className={eyebrow}>Beyond the ordinary</span>
            <h2 className="mb-0! text-[38px]! sm:text-5xl!">
              Outside the city,
              <br />
              <span className="text-[#9c593b] italic">
                another Morocco awaits.
              </span>
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-3 text-xs font-semibold"
            href="/tours?category=Day+trips"
          >
            Discover day trips
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className={wrap + " pb-16 lg:pb-24"}>
        <div className="grid overflow-hidden rounded-3xl bg-[#153e35] lg:grid-cols-2">
          <div className="relative hidden min-h-[480px] lg:block">
            <Image
              src={image(
                "public/assets/images/intent/marrakech/ait-ben-haddou.jpg",
              )}
              alt="Earthen kasbah architecture at Aït Benhaddou, Morocco"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#102b23]/50 to-transparent" />
            <span className="absolute bottom-8 left-8 text-[10px] tracking-[0.15em] text-white uppercase">
              Aït Benhaddou · Along the way
            </span>
          </div>
          <div className="p-8 text-white sm:p-12 lg:p-14">
            <span className="mb-5 flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#d8bc93] uppercase">
              <Users className="size-4" />
              Real people. Local knowledge.
            </span>
            <h2 className="text-[38px]! leading-[1.1]! text-white sm:text-5xl!">
              Good journeys start
              <br />
              with a conversation.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              Not sure which desert, how many days or where to begin? Tell us
              what you have in mind. Our team will help you find a route that
              feels right.
            </p>
            <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
              {[
                "Choose the route that fits your time",
                "Check your dates and travel options",
                "Get your arrangements clearly confirmed",
              ].map((s, i) => (
                <p
                  key={s}
                  className="flex items-center gap-4 text-xs text-white/80"
                >
                  <span className="font-mono text-[10px] text-[#d8bc93]">
                    0{i + 1}
                  </span>
                  {s}
                </p>
              ))}
            </div>
            <Link
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#eed5b0] px-6 py-4 text-xs font-semibold text-[#153e35] transition hover:bg-white"
              href="/contact-us"
            >
              <MessageCircle className="size-4" />
              Talk to our local team
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
