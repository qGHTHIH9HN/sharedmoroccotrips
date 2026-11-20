import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mountain,
  Sun,
  Compass,
  Route,
  Users,
  MessagesSquare,
  Check,
  Palmtree,
  Waves,
} from "lucide-react";
import { catalogue, image, category } from "@/lib/content";
import TourCard from "@/components/TourCard";
const wrap = "mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12";
const cats = [
  { name: "All experiences", href: "/tours", icon: Compass },
  { name: "Desert tours", href: "/tours?category=Desert+tours", icon: Sun },
  { name: "Day trips", href: "/tours?category=Day+trips", icon: Mountain },
  { name: "Agafay", href: "/tours?category=Agafay", icon: Palmtree },
  { name: "Activities", href: "/tours?category=Activities", icon: Users },
  {
    name: "Morocco circuits",
    href: "/tours?category=Morocco+circuits",
    icon: Route,
  },
];
export default async function Home() {
  const c = await catalogue();
  const popular = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-desert-tour-marrakech-to-fes-3-days",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ]
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const day = c.services.filter((s) => category(s) === "Day trips").slice(0, 3);
  return (
    <main id="main">
      <section
        className={
          wrap +
          " grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pt-14 lg:pb-16"
        }
      >
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-3 py-1.5 text-[10px] font-bold text-[#d9481f]">
            <span className="size-1.5 rounded-full bg-[#ff6435]" />A little
            adventure. A lot of Morocco.
          </span>
          <h1 className="mb-6! text-[clamp(2.8rem,5.3vw,5rem)]! leading-[1.04]! font-extrabold! tracking-[-0.065em]! text-slate-950">
            Big adventures.
            <br />
            Better <span className="text-[#f05a2d]">together.</span>
          </h1>
          <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            Find your people. Take the scenic route. Explore shared desert
            tours, day trips and local experiences across Morocco.
          </p>
          <form
            action="/tours"
            className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-100"
          >
            <Search className="ml-3 size-5 shrink-0 text-slate-400" />
            <label className="min-w-0 flex-1">
              <span className="sr-only">Destination or experience</span>
              <input
                name="q"
                className="min-h-11 w-full min-w-0 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                placeholder="Where do you want to go?"
              />
            </label>
            <button className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-[#ff6435] px-4 text-xs font-bold text-white transition hover:bg-[#df4a20] sm:px-5">
              Explore
              <ArrowRight className="size-4" />
            </button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
            <span>Start somewhere:</span>
            {["Merzouga", "Essaouira", "Agafay"].map((t) => (
              <Link
                href={`/tours?q=${t}`}
                className="rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-600 transition hover:bg-orange-50 hover:text-orange-700"
                key={t}
              >
                {t} ↗
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-[#f05a2d]" />
              Local Moroccan team
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-[#f05a2d]" />
              Prices in euros
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-[#f05a2d]" />
              Help before you book
            </span>
          </div>
        </div>
        <div className="relative grid h-[350px] grid-cols-[1.2fr_0.8fr] grid-rows-2 gap-3 sm:h-[450px] lg:h-[490px]">
          <div className="relative row-span-2 overflow-hidden rounded-2xl">
            <Image
              src={image("public/assets/images/intent/marrakech/merzouga.jpg")}
              alt="Sahara dunes at Merzouga"
              fill
              priority
              sizes="(max-width:1024px) 60vw,30vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-1.5 text-xs font-semibold text-white">
              <MapPin className="size-3.5" />
              Sahara, Morocco
            </span>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={image("public/assets/images/intent/tangier/chefchaouen.jpg")}
              alt="Blue streets of Chefchaouen"
              fill
              priority
              sizes="(max-width:1024px) 40vw,20vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={image("public/assets/images/intent/agadir/essaouira.webp")}
              alt="Essaouira on the Atlantic coast"
              fill
              priority
              sizes="(max-width:1024px) 40vw,20vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl shadow-slate-900/10 sm:left-8">
            <span className="grid size-10 place-items-center rounded-lg bg-[#fff0e9]">
              <Route className="size-5 text-[#f05a2d]" />
            </span>
            <div>
              <strong className="block text-xs font-bold">
                One country. Endless possibilities.
              </strong>
              <span className="text-[10px] text-slate-400">
                Your next story starts here.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={wrap + " pt-6 pb-10"}>
        <div className="flex gap-2 overflow-x-auto border-y border-slate-100 py-5">
          {cats.map(({ name, href, icon: Icon }, i) => (
            <Link
              href={href}
              key={name}
              className={
                "flex shrink-0 items-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition " +
                (i === 0
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50")
              }
            >
              <Icon className="size-4" />
              {name}
            </Link>
          ))}
        </div>
      </section>
      <section className={wrap + " pb-16"}>
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-[#e94b1d] uppercase">
              The Sahara starts here
            </p>
            <h2 className="mb-0! text-[28px]! font-extrabold! tracking-[-0.045em]! sm:text-4xl!">
              Pick your next adventure.
            </h2>
          </div>
          <Link
            href="/tours?category=Desert+tours"
            className="flex shrink-0 items-center gap-2 text-xs font-bold text-slate-600"
          >
            View tours
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="bg-[#f5f7fa] py-14">
        <div className={wrap}>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-wider text-[#e94b1d] uppercase">
                Go somewhere different
              </p>
              <h2 className="mb-0! text-[28px]! font-extrabold! tracking-[-0.045em]! sm:text-4xl!">
                What’s your kind of escape?
              </h2>
            </div>
            <Link
              href="/tours"
              className="flex items-center gap-2 text-xs font-bold text-slate-600"
            >
              Explore everything
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              [
                "Sahara",
                "Dunes & desert nights",
                "merzouga",
                "public/assets/images/intent/marrakech/merzouga.jpg",
              ],
              [
                "Essaouira",
                "Ocean air & medina streets",
                "essaouira",
                "public/assets/images/intent/agadir/essaouira.webp",
              ],
              [
                "Atlas Mountains",
                "A different pace",
                "atlas",
                "public/assets/images/intent/agadir/anti-atlas.webp",
              ],
              [
                "Morocco circuits",
                "Connect the discoveries",
                "Morocco",
                "public/assets/images/intent/tangier/chefchaouen.jpg",
              ],
            ].map(([title, desc, q, src]) => (
              <Link
                href={
                  title === "Morocco circuits"
                    ? "/tours?category=Morocco+circuits"
                    : `/tours?q=${q}`
                }
                key={title}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="relative h-40 overflow-hidden sm:h-48">
                  <Image
                    src={image(src)}
                    alt={title}
                    fill
                    sizes="(max-width:1024px) 50vw,25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-1 text-[10px] text-slate-400">{desc}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-[#f05a2d]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={wrap + " py-16"}>
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-[#e94b1d] uppercase">
              Small escape. Big memories.
            </p>
            <h2 className="mb-0! text-[28px]! font-extrabold! tracking-[-0.045em]! sm:text-4xl!">
              Make a day of it.
            </h2>
          </div>
          <Link
            href="/tours?category=Day+trips"
            className="flex shrink-0 items-center gap-2 text-xs font-bold text-slate-600"
          >
            All day trips
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {day.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className={wrap + " pb-16"}>
        <div className="grid gap-8 rounded-2xl bg-slate-950 p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold tracking-wider text-orange-300 uppercase">
              <MessagesSquare className="size-4" />A real team, right here in
              Morocco
            </span>
            <h2 className="mb-3! text-3xl! font-bold! tracking-tight!">
              A great trip starts with a good question.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-slate-400">
              Not sure which route fits your time? Tell us your dates and what
              you’d love to see. We’ll help you connect the dots.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-4 text-xs font-bold transition hover:bg-[#e94b1d]"
            href="/contact-us"
          >
            Let’s plan your trip
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
