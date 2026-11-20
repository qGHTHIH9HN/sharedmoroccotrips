import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  MapPin,
  Compass,
  Users,
  Check,
  MoveDown,
  MessageCircle,
} from "lucide-react";
import {
  catalogue,
  category,
  image,
  money,
  hasPrice,
  route,
  text,
  Row,
} from "@/lib/content";

const wrap = "mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16";
const overline =
  "mb-4 block text-[10px] font-medium tracking-[0.2em] uppercase text-[#987b50]";
const heading =
  "mb-0! font-serif! text-[44px]! font-normal! leading-[1.02]! tracking-[-0.02em]! sm:text-[60px]!";
const link =
  "inline-flex w-fit items-center gap-6 border-b border-[#33483c]/30 pb-2.5 text-[11px] font-medium text-[#33483c] transition hover:border-[#987b50] hover:text-[#987b50]";
const experiences = [
  ["Desert tours", "The Sahara"],
  ["Day trips", "Day escapes"],
  ["Morocco circuits", "Across Morocco"],
  ["Agafay", "Agafay"],
  ["Activities", "Local experiences"],
];

function HomeTrip({ item }: { item: Row }) {
  return (
    <Link
      href={route(item)}
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#987b50]"
    >
      <div className="relative aspect-[1.25] overflow-hidden bg-[#e8e8df]">
        <Image
          src={
            image(item.featured_image) ||
            image("public/assets/images/intent/marrakech/sahara-morocco.jpg")
          }
          alt={item.title}
          fill
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        <span className="absolute top-4 left-4 bg-[#fbfaf6]/95 px-3 py-2 text-[9px] tracking-[0.1em] uppercase text-[#33483c]">
          {item.duration || "Experience"}
        </span>
        <span className="absolute right-4 bottom-4 grid size-10 place-items-center border border-white/50 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#33483c]">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <span className="mb-3 text-[9px] tracking-[0.15em] uppercase text-[#987b50]">
          {item.group_type === "group"
            ? "A shared journey"
            : item.group_type === "private"
              ? "A private journey"
              : "Explore Morocco"}
        </span>
        <h3 className="mb-3 font-serif text-[29px] leading-[1.12] text-[#2b4135] transition group-hover:text-[#987b50]">
          {item.title}
        </h3>
        <p className="mb-5 line-clamp-2 flex-1 text-[11px] leading-6 text-[#7b8374]">
          {item.location}
        </p>
        <div className="flex items-baseline gap-2 border-t border-[#33483c]/15 pt-4">
          {hasPrice(item) && (
            <span className="text-[10px] text-[#7b8374]">From</span>
          )}
          <strong className="text-lg font-medium text-[#33483c]">
            {money(item)}
          </strong>
          {hasPrice(item) && (
            <span className="text-[10px] text-[#7b8374]">per person</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const c = await catalogue();
  const selected = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-desert-tour-marrakech-to-fes-3-days",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ]
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const dayTrips = c.services
    .filter((s) => category(s) === "Day trips")
    .slice(0, 3);
  const posts = c.posts.slice(0, 2);
  return (
    <main id="main">
      <section className="relative isolate flex min-h-[590px] items-center overflow-hidden bg-[#22392d] pb-24 text-white sm:min-h-[640px] lg:min-h-[690px]">
        <Image
          src={image(
            "public/assets/images/intent/marrakech/sahara-morocco.jpg",
          )}
          alt="Evening light across the dunes of the Moroccan Sahara"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_55%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#14251a]/65 via-[#17281d]/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/5" />
        <div className={wrap + " relative w-full py-14"}>
          <span className="mb-7 inline-flex items-center gap-3 text-[9px] font-medium tracking-[0.25em] text-[#f0dcc0] uppercase">
            <span className="h-px w-9 bg-[#f0dcc0]/70" />
            Shared journeys. Extraordinary Morocco.
          </span>
          <h1 className="mb-7! max-w-4xl font-serif! text-[64px]! font-normal! leading-[0.95]! tracking-[-0.025em]! text-white sm:text-[88px]! lg:text-[112px]!">
            Morocco,
            <br />
            <span className="italic text-[#f0dcc0]">made to be shared.</span>
          </h1>
          <p className="max-w-[380px] text-[13px] leading-7 text-white/85 sm:text-sm">
            Follow the desert light, the mountain roads and the Atlantic breeze.
            Discover the places—and the people—that make a journey stay with
            you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tours"
              className="inline-flex min-h-12 items-center gap-8 bg-[#f8f5ec] px-6 py-4 text-[10px] font-medium tracking-wide text-[#2b4135] transition hover:bg-white"
            >
              Explore our journeys
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-12 items-center gap-3 border border-white/40 px-5 py-4 text-[10px] font-medium transition hover:bg-white/10"
            >
              Speak with our local team
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="absolute right-10 bottom-20 hidden items-center gap-3 text-[9px] tracking-[0.16em] text-white/75 uppercase lg:flex">
          <MapPin className="size-3" />
          The Sahara, southern Morocco
        </div>
      </section>
      <div className={wrap + " relative z-10 -mt-10"}>
        <form
          action="/tours"
          className="grid gap-6 border border-[#33483c]/10 bg-[#fbfaf6] p-6 shadow-xl shadow-[#22392d]/5 sm:gap-8 sm:p-8 md:grid-cols-[1.2fr_1fr_auto] md:items-center"
        >
          <label className="block">
            <span className="mb-2.5 flex items-center gap-2 text-[9px] font-medium tracking-[0.13em] text-[#33483c] uppercase">
              <MapPin className="size-3.5 text-[#987b50]" />
              Where would you like to go?
            </span>
            <input
              name="q"
              placeholder="Merzouga, Essaouira, the Atlas…"
              className="min-h-9 w-full border-0 bg-transparent text-[13px] text-[#33483c] outline-offset-4 placeholder:text-[#969b8f]"
            />
          </label>
          <label className="block border-t border-[#33483c]/10 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <span className="mb-2.5 flex items-center gap-2 text-[9px] font-medium tracking-[0.13em] text-[#33483c] uppercase">
              <Compass className="size-3.5 text-[#987b50]" />
              Your kind of experience
            </span>
            <select
              name="category"
              className="min-h-9 w-full bg-transparent text-[13px] text-[#6c7869]"
            >
              <option value="">All journeys & experiences</option>
              {experiences.map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button className="inline-flex min-h-12 items-center justify-center gap-5 bg-[#33483c] px-7 py-4 text-[10px] font-medium tracking-wide text-white transition hover:bg-[#496251]">
            Find your journey
            <Search className="size-4" />
          </button>
        </form>
      </div>
      <div
        className={
          wrap +
          " flex flex-wrap justify-center gap-x-10 gap-y-4 py-7 text-[10px] text-[#7b8374] sm:gap-x-14"
        }
      >
        {[
          "Local Moroccan team",
          "Clear prices in euros",
          "Shared & private options",
          "Personal help with your plans",
        ].map((label) => (
          <span className="flex items-center gap-2" key={label}>
            <Check className="size-3.5 text-[#987b50]" />
            {label}
          </span>
        ))}
      </div>

      <section
        className={
          wrap +
          " grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-20"
        }
      >
        <div>
          <span className={overline}>A country of contrasts</span>
          <h2 className={heading}>
            Not just somewhere
            <br />
            to go.{" "}
            <span className="italic text-[#987b50]">Something to feel.</span>
          </h2>
        </div>
        <div className="max-w-lg self-end">
          <p className="text-sm leading-8 text-[#7b8374]">
            The silence between the dunes. The colour of a mountain village. The
            first taste of tea after a long road. Our shared journeys bring
            together Morocco’s extraordinary places with the simple pleasure of
            discovering them in good company.
          </p>
          <Link href="/tours" className={link + " mt-6"}>
            Find the journey that feels like you
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className={wrap + " pt-3 pb-20 lg:pb-28"}>
        <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className={overline}>The desert collection</span>
            <h2 className={heading}>
              Let the Sahara{" "}
              <span className="italic text-[#987b50]">call you.</span>
            </h2>
          </div>
          <Link href="/tours?category=Desert+tours" className={link}>
            All Sahara journeys
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {selected.map((item) => (
            <HomeTrip key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-[#eaece3] py-16 lg:py-24">
        <div className={wrap}>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className={overline}>Choose your landscape</span>
              <h2 className={heading}>
                Many worlds.
                <br />
                <span className="italic text-[#987b50]">One Morocco.</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-7 text-[#7b8374]">
              An open horizon or a winding medina lane. A day away or a longer
              adventure. There is more than one way to discover Morocco.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Link
              href="/tours?category=Morocco+circuits"
              className="group relative min-h-[440px] overflow-hidden lg:min-h-[580px]"
            >
              <Image
                src={image(
                  "public/assets/images/intent/tangier/chefchaouen.jpg",
                )}
                alt="The blue lanes of Chefchaouen"
                fill
                sizes="(max-width:1024px) 100vw,55vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#16271c]/65 to-transparent" />
              <div className="absolute right-7 bottom-8 left-7 flex items-end justify-between gap-4 text-white">
                <div>
                  <span className="mb-3 block text-[9px] tracking-[0.2em] uppercase">
                    Take the longer road
                  </span>
                  <h3 className="font-serif text-5xl leading-none">
                    Morocco, from
                    <br />
                    <span className="italic">one discovery to the next.</span>
                  </h3>
                </div>
                <ArrowUpRight className="size-6 shrink-0" />
              </div>
            </Link>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {[
                [
                  "The Atlantic coast",
                  "Essaouira",
                  "public/assets/images/intent/agadir/essaouira.webp",
                ],
                [
                  "The Atlas Mountains",
                  "Atlas",
                  "public/assets/images/intent/agadir/anti-atlas.webp",
                ],
              ].map(([name, q, src]) => (
                <Link
                  href={`/tours?q=${q}`}
                  key={name}
                  className="group relative min-h-[280px] overflow-hidden"
                >
                  <Image
                    src={image(src)}
                    alt={name}
                    fill
                    sizes="(max-width:640px) 100vw,50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#16271c]/60 to-transparent" />
                  <div className="absolute right-7 bottom-7 left-7 flex items-end justify-between gap-4 text-white">
                    <h3 className="font-serif text-4xl">{name}</h3>
                    <ArrowUpRight className="size-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={wrap + " py-20 lg:py-28"}>
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className={overline}>A day well spent</span>
            <h2 className={heading}>
              Leave the city.
              <br />
              <span className="italic text-[#987b50]">Keep the memories.</span>
            </h2>
          </div>
          <Link href="/tours?category=Day+trips" className={link}>
            Discover our day escapes
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dayTrips.map((item) => (
            <HomeTrip key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="grid bg-[#33483c] text-[#f5f2e9] lg:grid-cols-2">
        <div className="relative min-h-[350px] lg:min-h-[540px]">
          <Image
            src={image(
              "public/assets/images/intent/marrakech/ait-ben-haddou.jpg",
            )}
            alt="Traditional earthen kasbah architecture in southern Morocco"
            fill
            sizes="(max-width:1024px) 100vw,50vw"
            className="object-cover object-[center_40%]"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-16 xl:px-20">
          <span className="mb-5 text-[9px] font-medium tracking-[0.2em] text-[#c6b08c] uppercase">
            Locally rooted. Personally planned.
          </span>
          <h2 className="mb-6! font-serif! text-[50px]! font-normal! leading-[1.04]! text-[#f5f2e9] sm:text-[60px]!">
            Good journeys begin
            <br />
            <span className="italic text-[#d5bc97]">with a conversation.</span>
          </h2>
          <p className="max-w-sm text-xs leading-7 text-[#c4cdbd]">
            Unsure which desert, how many days or where to start? Tell us what
            you have in mind. Our team will help you choose, with the details
            explained before you travel.
          </p>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex w-fit items-center gap-10 border-b border-[#c6b08c]/60 pb-3 text-[11px] font-medium text-[#f5f2e9]"
          >
            Plan with our local team
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      {posts.length > 0 && (
        <section className={wrap + " py-20 lg:py-28"}>
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className={overline}>The travel journal</span>
              <h2 className={heading}>
                A little knowledge.
                <br />
                <span className="italic text-[#987b50]">A richer journey.</span>
              </h2>
            </div>
            <Link href="/blog" className={link}>
              Read the journal
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group grid gap-5 sm:grid-cols-[0.8fr_1.2fr]"
              >
                <div className="relative min-h-[230px] overflow-hidden bg-[#e8e8df]">
                  <Image
                    src={
                      image(post.featured_image) ||
                      image(
                        "public/assets/images/intent/marrakech/sahara-morocco.jpg",
                      )
                    }
                    alt={post.title}
                    fill
                    sizes="(max-width:640px) 100vw,25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="flex flex-col justify-center border-b border-[#33483c]/15 pb-5 sm:border-0">
                  <span className="mb-3 text-[9px] tracking-[0.15em] uppercase text-[#987b50]">
                    Morocco, thoughtfully explored
                  </span>
                  <h3 className="mb-4 font-serif text-[28px] leading-[1.12] text-[#33483c]">
                    {post.title}
                  </h3>
                  <p className="mb-5 line-clamp-2 text-[11px] leading-6 text-[#7b8374]">
                    {text(post.excerpt)}
                  </p>
                  <span className="flex items-center gap-4 text-[10px] font-medium">
                    Read the story
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
