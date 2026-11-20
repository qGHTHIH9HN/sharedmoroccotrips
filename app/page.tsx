import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Plus, MoveDown, MapPin } from "lucide-react";
import { catalogue, image, category } from "@/lib/content";
import TourCard from "@/components/TourCard";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16";
const label =
  "mb-5 block text-[9px] font-medium tracking-[0.22em] uppercase text-[#94764c]";
const title =
  "mb-0! font-serif! text-[44px]! font-normal! leading-[1.02]! tracking-[-0.025em]! sm:text-[58px]!";
export default async function Home() {
  const c = await catalogue();
  const featured = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-desert-tour-marrakech-to-fes-3-days",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ]
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const day = c.services.filter((s) => category(s) === "Day trips").slice(0, 3);
  return (
    <main id="main">
      <section className="grid bg-[#eeeee5] lg:min-h-[650px] lg:grid-cols-[0.84fr_1.16fr]">
        <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:py-20 lg:pr-10 lg:pl-[max(4rem,calc((100vw-1440px)/2+4rem))]">
          <span className={label}>Morocco, with a local perspective</span>
          <h1 className="mb-7! font-serif! text-[50px]! font-normal! leading-[0.94]! tracking-[-0.035em]! text-[#293e32] sm:text-[76px]! lg:text-[64px]! xl:text-[78px]! 2xl:text-[90px]!">
            Extraordinary
            <br />
            places.
            <br />
            <span className="font-serif italic text-[#94764c]">
              Shared stories.
            </span>
          </h1>
          <p className="max-w-[310px] text-[13px] leading-7 text-[#6d786a]">
            Beyond the familiar, there is a Morocco of open landscapes, quiet
            discoveries and journeys made richer by the people beside you.
          </p>
          <Link
            href="/tours"
            className="mt-8 inline-flex w-fit items-center gap-10 border-b border-[#33483c]/40 pb-3 text-[10px] font-medium tracking-[0.08em] text-[#33483c] uppercase"
          >
            Discover our journeys
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative min-h-[400px] lg:min-h-[650px]">
          <Image
            src={image(
              "public/assets/images/intent/marrakech/sahara-morocco.jpg",
            )}
            alt="Open Sahara dune landscape in southern Morocco"
            fill
            priority
            sizes="(max-width:1024px) 100vw,60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#17271d]/30 to-transparent" />
          <div className="absolute right-6 bottom-7 left-6 flex items-end justify-between gap-4 text-white lg:right-10 lg:left-10">
            <span className="flex items-center gap-2 text-[8px] tracking-[0.2em] uppercase">
              <MapPin className="size-3" />
              The Sahara · Southern Morocco
            </span>
            <span className="font-serif text-4xl italic">
              A different rhythm.
            </span>
          </div>
        </div>
      </section>
      <section className={wrap + " py-8"}>
        <form
          action="/tours"
          className="grid items-end gap-6 border-b border-[#33483c]/20 pb-8 sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="block text-[9px] font-medium tracking-wider text-[#33483c] uppercase">
            Where would you like to go?
            <input
              name="q"
              className="mt-3 min-h-10 w-full border-0 bg-transparent text-sm font-normal tracking-normal text-[#33483c] outline-offset-4 placeholder:text-[#8e9788]"
              placeholder="A destination, a landscape, a feeling…"
            />
          </label>
          <label className="block text-[9px] font-medium tracking-wider text-[#33483c] uppercase">
            Choose your experience
            <select
              name="category"
              className="mt-3 min-h-10 w-full border-0 bg-transparent text-sm font-normal tracking-normal text-[#6d786a]"
            >
              <option value="">All journeys & experiences</option>
              {[
                "Desert tours",
                "Day trips",
                "Morocco circuits",
                "Agafay",
                "Activities",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <button className="flex min-h-12 items-center justify-center gap-8 bg-[#33483c] px-7 text-[10px] font-medium tracking-wider text-white uppercase transition hover:bg-[#496251]">
            Find a journey
            <ArrowUpRight className="size-4" />
          </button>
        </form>
      </section>
      <section
        className={
          wrap +
          " grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28 lg:py-20"
        }
      >
        <div>
          <span className={label}>Travel thoughtfully. Travel together.</span>
          <h2 className={title}>
            More than a destination.
            <br />
            <span className="italic text-[#94764c]">
              A sense of connection.
            </span>
          </h2>
        </div>
        <div className="max-w-lg self-end">
          <p className="text-sm leading-8 text-[#76806f]">
            A mountain pass that opens onto another world. The first glimpse of
            the dunes. A conversation over mint tea. We bring together the
            places and people that make a journey through Morocco memorable.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[9px] tracking-wide text-[#33483c] uppercase">
            <span>Local Moroccan team</span>
            <span>Shared & private options</span>
            <span>Clear trip details</span>
          </div>
        </div>
      </section>
      <section className={wrap + " pt-4 pb-20 lg:pb-28"}>
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className={label}>Our desert collection</span>
            <h2 className={title}>The call of the Sahara.</h2>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-6 border-b border-[#33483c]/30 pb-2 text-[10px] tracking-wide text-[#33483c]"
            href="/tours?category=Desert+tours"
          >
            Explore the collection
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="bg-[#eaece3] py-16 lg:py-24">
        <div className={wrap}>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className={label}>The many sides of Morocco</span>
              <h2 className={title}>Follow your curiosity.</h2>
            </div>
            <p className="max-w-xs text-xs leading-7 text-[#76806f]">
              From the quiet of the desert to the Atlantic breeze. Every
              landscape has a story to share.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr_1fr]">
            {[
              [
                "The Sahara",
                "Desert tours",
                "public/assets/images/intent/marrakech/sahara-morocco.jpg",
              ],
              [
                "The Atlantic",
                "Essaouira",
                "public/assets/images/intent/agadir/essaouira.webp",
              ],
              [
                "Beyond the cities",
                "Atlas",
                "public/assets/images/intent/agadir/anti-atlas.webp",
              ],
            ].map(([name, q, src], i) => (
              <Link
                href={
                  i === 0 ? "/tours?category=Desert+tours" : `/tours?q=${q}`
                }
                key={name}
                className={
                  "group relative overflow-hidden " +
                  (i === 1
                    ? "h-[340px] md:mt-14 md:h-[390px]"
                    : "h-[400px] md:h-[460px]")
                }
              >
                <Image
                  src={image(src)}
                  alt={name}
                  fill
                  sizes="(max-width:768px) 100vw,33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
                <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between text-white">
                  <span className="font-serif text-4xl">{name}</span>
                  <ArrowUpRight className="size-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={wrap + " py-20 lg:py-28"}>
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className={label}>A day well spent</span>
            <h2 className={title}>
              Small escapes.
              <br />
              <span className="italic text-[#94764c]">
                Lasting impressions.
              </span>
            </h2>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-6 border-b border-[#33483c]/30 pb-2 text-[10px] tracking-wide"
            href="/tours?category=Day+trips"
          >
            Discover day escapes
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {day.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="grid bg-[#33483c] text-[#f3f1e8] lg:grid-cols-2">
        <div className="relative min-h-[350px] lg:min-h-[520px]">
          <Image
            src={image(
              "public/assets/images/intent/marrakech/ait-ben-haddou.jpg",
            )}
            alt="Earth-built kasbah architecture at Aït Benhaddou"
            fill
            sizes="(max-width:1024px) 100vw,50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-20">
          <span className="mb-5 text-[9px] tracking-[0.22em] text-[#c1a67a] uppercase">
            A journey shaped around you
          </span>
          <h2 className="mb-6! font-serif! text-[52px]! font-normal! leading-[1]! tracking-tight!">
            It begins with
            <br />
            <span className="italic text-[#c1a67a]">a conversation.</span>
          </h2>
          <p className="max-w-sm text-xs leading-7 text-[#c1cbbb]">
            Tell us your dates, your interests and what you hope to find. Our
            local team will help you choose a route and make the details clear.
          </p>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex w-fit items-center gap-12 border-b border-[#c1a67a]/60 pb-3 text-[10px] tracking-wider uppercase"
          >
            Plan your journey
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
