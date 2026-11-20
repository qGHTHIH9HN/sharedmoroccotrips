import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  catalogue,
  tour,
  image,
  money,
  hasPrice,
  html,
  text,
  route,
  origin,
  Tour,
  Row,
} from "@/lib/content";
import Inquiry from "@/components/Inquiry";
async function resolve(path: string[]) {
  if (path.length === 2) {
    const s = await tour(path[1]);
    if (s && route(s) === `/${path.map(encodeURIComponent).join("/")}`)
      return { kind: "tour" as const, item: s };
  }
  if (path.length === 1) {
    const c = await catalogue();
    const p = c.pages.find((p) => p.slug === path[0]);
    if (p) return { kind: "page" as const, item: p };
  }
  if (path.length === 2 && path[0] === "blog") {
    const c = await catalogue();
    const p = c.posts.find((p) => p.slug === path[1]);
    if (p) return { kind: "page" as const, item: p };
  }
  return null;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const r = await resolve(path);
  if (!r) return { title: "Page not found" };
  return {
    title: r.item.meta_title || r.item.title,
    description: r.item.meta_description || r.item.excerpt,
  };
}
export default async function Detail({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const r = await resolve(path);
  if (!r) notFound();
  if (r.kind === "page") {
    const s = r.item;
    const src = image(s.hero_image || s.featured_image);
    return (
      <main
        id="main"
        className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 max-w-4xl [&>h1]:mt-6"
      >
        <Link
          className="inline-flex items-center gap-2 border-b border-[#ff6435]/50 pb-1 text-sm font-semibold text-[#172033] transition hover:text-[#ff6435]"
          href="/"
        >
          Home
        </Link>
        <h1>{s.title}</h1>
        {s.excerpt && (
          <p className="mb-6 text-lg leading-relaxed text-stone-600">
            {s.excerpt}
          </p>
        )}
        {src && (
          <div className="relative my-9 h-72 overflow-hidden rounded-3xl sm:h-[440px] [&_img]:object-cover">
            <Image
              src={src}
              alt={s.title}
              fill
              sizes="(max-width:900px) 100vw,900px"
              priority
            />
          </div>
        )}
        <div
          className="text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
          dangerouslySetInnerHTML={{ __html: html(s.content) }}
        />
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df4a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6435]"
          href="/tours"
        >
          Explore experiences ↗
        </Link>
      </main>
    );
  }
  return <TourDetail s={r.item} />;
}
function TourDetail({ s }: { s: Tour }) {
  const hero = image(s.featured_image);
  const photos = s.images
    .filter((p) => image(p.image_path) && image(p.image_path) !== hero)
    .slice(0, 2);
  const inc = s.includes.filter((x) => Number(x.is_active) !== 0);
  const stays = s.accommodations.filter((x) => Number(x.is_active) !== 0);
  return (
    <main id="main">
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-10 sm:px-10 lg:px-14 lg:pt-16 [&_h1]:max-w-5xl [&_h1]:text-[clamp(2rem,3.6vw,3.4rem)] [&_h1]:leading-[1.03] [&_h1]:tracking-[-.045em]">
        <div className="mb-9 text-xs leading-6 text-stone-500 [&_a:hover]:text-[#ff6435]">
          <Link href="/">Home</Link> / <Link href="/tours">Experiences</Link> /{" "}
          {s.duration}
        </div>
        <span className="mb-5 block text-xs font-bold tracking-[0.22em] uppercase text-[#df4a20]">
          {s.group_type === "group"
            ? "SHARED EXPERIENCE"
            : s.group_type === "private"
              ? "PRIVATE EXPERIENCE"
              : "MOROCCO EXPERIENCE"}
        </span>
        <h1>{s.title}</h1>
        <p className="mb-6 text-lg leading-relaxed text-stone-600">
          {s.location}
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-6 sm:px-10 md:h-[440px] md:grid-cols-[2fr_1fr] md:grid-rows-2 lg:px-14">
        <div className="relative min-h-80 overflow-hidden rounded-2xl md:row-span-2 [&:only-child]:col-span-full [&_img]:object-cover">
          {hero && (
            <Image
              src={hero}
              alt={s.title}
              fill
              priority
              sizes="(max-width:700px) 100vw,66vw"
            />
          )}
        </div>
        {photos.map((p, i) => (
          <div
            key={i}
            className="relative hidden overflow-hidden rounded-xl md:block [&_img]:object-cover"
          >
            <Image
              src={image(p.image_path)}
              alt={String(p.alt_text || p.caption || s.title)}
              fill
              sizes="33vw"
            />
          </div>
        ))}
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-6 pb-24 pt-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:px-14 lg:pt-16">
        <article>
          <div className="grid grid-cols-2 gap-6 rounded-xl border border-[#172033]/10 bg-[#f0eee6] p-7 [&_small]:mb-2 [&_small]:block [&_small]:text-xs [&_small]:text-stone-500 [&_strong]:text-sm [&_strong]:font-medium [&>div:last-child]:col-span-2">
            <div>
              <small>Duration</small>
              <strong>{s.duration}</strong>
            </div>
            <div>
              <small>Travel style</small>
              <strong>{text(s.journey_style) || "Ask our team"}</strong>
            </div>
            <div>
              <small>Transport</small>
              <strong>{text(s.transport_info) || "See inclusions"}</strong>
            </div>
          </div>
          <nav
            className="sticky top-0 z-20 mt-8 flex flex-wrap gap-x-7 gap-y-3 border-b border-stone-200 bg-[#ffffff]/95 py-5 text-sm font-semibold backdrop-blur-md [&_a:hover]:text-[#ff6435]"
            aria-label="Tour sections"
          >
            <a href="#overview">Overview</a>
            {s.days.length > 0 && <a href="#itinerary">Itinerary</a>}
            {stays.length > 0 && <a href="#stay">Stay</a>}
            {inc.length > 0 && <a href="#included">Included</a>}
            {s.faqs.length > 0 && <a href="#faq">FAQs</a>}
          </nav>
          <section
            id="overview"
            className="scroll-mt-28 border-b border-stone-200 py-12 [&>h2]:text-[clamp(2rem,3vw,3rem)]"
          >
            <h2>Your experience</h2>
            <p className="mb-6 text-lg leading-relaxed text-stone-600">
              {text(s.hero_intro || s.excerpt)}
            </p>
            <div
              className="text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: html(s.content) }}
            />
          </section>
          {s.days.length > 0 && (
            <section
              id="itinerary"
              className="scroll-mt-24 border-b border-stone-200 py-9 [&>h2]:text-3xl"
            >
              <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#df4a20]">
                THE JOURNEY
              </span>
              <h2>
                {Number(s.duration_days) > 1 ? "Day by day" : "Your programme"}
              </h2>
              {s.days.map((d, i) => (
                <details
                  className="group border-t border-stone-200 [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:gap-4 [&_summary]:py-6 [&_summary]:text-sm [&_summary]:font-semibold [&_summary>span:last-child]:ml-auto"
                  key={i}
                  open={i === 0}
                >
                  <summary>
                    <span className="text-xs font-bold text-[#ff6435]">
                      {String(d.day_number || i + 1).padStart(2, "0")}
                    </span>
                    <span>{text(d.title)}</span>
                    <span>+</span>
                  </summary>
                  <div
                    className="pb-6 pl-9 text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{
                      __html: html(d.details || d.description),
                    }}
                  />
                  {Boolean(d.meals) && (
                    <p className="pb-6 pl-9 text-sm text-stone-600">
                      <strong>Meals:</strong> {text(d.meals)}
                    </p>
                  )}
                </details>
              ))}
            </section>
          )}
          {stays.length > 0 && (
            <section
              id="stay"
              className="scroll-mt-24 border-b border-stone-200 py-9 [&>h2]:text-3xl"
            >
              <h2>Where you’ll stay</h2>
              {stays.map((a, i) => (
                <div
                  key={i}
                  className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-white p-7 [&_h3]:mb-2 [&_h3]:text-xl [&_p]:mt-3 [&_p]:text-sm [&_p]:text-stone-600"
                >
                  {image(a.image_url) && (
                    <div className="relative mb-5 h-56 overflow-hidden rounded-xl [&_img]:object-cover">
                      <Image
                        src={image(a.image_url)}
                        alt={text(a.name)}
                        fill
                        sizes="200px"
                      />
                    </div>
                  )}
                  <div>
                    <h3>{text(a.name)}</h3>
                    <p>
                      {text(a.location)} · {text(a.accommodation_type)}
                    </p>
                    <div
                      className="text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                      dangerouslySetInnerHTML={{ __html: html(a.description) }}
                    />
                    {Boolean(a.room_details) && <p>{text(a.room_details)}</p>}
                    {Boolean(a.upgrade_details) && (
                      <p>
                        <strong>Upgrade:</strong> {text(a.upgrade_details)}
                      </p>
                    )}
                    {Boolean(a.substitution_note) && (
                      <p className="my-4 text-xs leading-6 text-stone-500">
                        {text(a.substitution_note)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
          {inc.length > 0 && (
            <section
              id="included"
              className="scroll-mt-24 border-b border-stone-200 py-9 [&>h2]:text-3xl"
            >
              <h2>What’s included & extra</h2>
              {inc.map((x, i) => (
                <div
                  className="border-t border-stone-200 py-5 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold"
                  key={i}
                >
                  <h3>{text(x.title)}</h3>
                  <div
                    className="text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: html(x.details) }}
                  />
                </div>
              ))}
            </section>
          )}
          {s.departures.length > 0 && (
            <section className="scroll-mt-24 border-b border-stone-200 py-9 [&>h2]:text-3xl">
              <h2>Scheduled departures</h2>
              <p>
                Ask our team to confirm current places and the final price for
                your party.
              </p>
              <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-5 [&>div]:border-b [&>div]:border-stone-200 [&>div]:py-4 [&>div]:text-sm">
                {s.departures.map((d, i) => (
                  <div key={i}>
                    <strong>{text(d.start_date)}</strong>
                    <span>{text(d.status)}</span>
                    <span>
                      {Number(d.seats) > 0
                        ? `${Number(d.seats)} places listed`
                        : "Check places"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {s.faqs.length > 0 && (
            <section
              id="faq"
              className="scroll-mt-24 border-b border-stone-200 py-9 [&>h2]:text-3xl"
            >
              <h2>Before you go</h2>
              {s.faqs.map((f, i) => (
                <details
                  className="border-t border-stone-200 [&_summary]:cursor-pointer [&_summary]:py-5 [&_summary]:pr-4 [&_summary]:text-sm [&_summary]:font-semibold [&>div]:pb-6"
                  key={i}
                >
                  <summary>{text(f.question)}</summary>
                  <div
                    className="text-[15px] leading-8 text-stone-600 [&_p]:mb-5 [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:text-[#172033] [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#172033] [&_a]:text-[#df4a20] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: html(f.answer) }}
                  />
                </details>
              ))}
            </section>
          )}
        </article>
        <aside
          id="availability"
          className="scroll-mt-28 rounded-2xl border border-[#172033]/10 bg-white p-8 shadow-2xl shadow-[#172033]/10 lg:sticky lg:top-8 [&>h2]:text-2xl"
        >
          <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#df4a20]">
            PLAN YOUR EXPERIENCE
          </span>
          <div className="mb-6 flex flex-wrap items-baseline gap-2 [&_strong]:text-4xl [&_strong]:font-semibold [&_small]:text-xs [&_span]:text-xs [&_span]:text-stone-500">
            {hasPrice(s) && <small>From</small>}
            <strong>{money(s)}</strong>
            <span>{hasPrice(s) ? "per person" : ""}</span>
          </div>
          <h2>Make this journey yours</h2>
          <p className="mb-6 text-sm leading-7 text-stone-500">
            Choose a preferred date and tell us who is travelling. Our local
            team will confirm the details with you.
          </p>
          <Inquiry title={s.title} url={origin + route(s)} />
          <a
            className="inline-flex items-center gap-2 border-b border-[#ff6435]/50 pb-1 text-sm font-semibold text-[#172033] transition hover:text-[#ff6435]"
            href={`mailto:Desertbrise@gmail.com?subject=${encodeURIComponent("Booking inquiry: " + s.title)}`}
          >
            Prefer email? Contact our team ↗
          </a>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-stone-200 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md lg:hidden [&>strong]:text-xl">
        <div>
          {hasPrice(s) && (
            <span className="block text-[10px] text-stone-500">From</span>
          )}
          <strong>{money(s)}</strong>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df4a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6435]"
          href="#availability"
        >
          Check availability
        </a>
      </div>
    </main>
  );
}
