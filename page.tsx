import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  catalogue,
  tour,
  image,
  money,
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
      <main id="main" className="section article">
        <Link className="text-link" href="/">
          Home
        </Link>
        <h1>{s.title}</h1>
        {s.excerpt && <p className="lead">{s.excerpt}</p>}
        {src && (
          <div className="article-image">
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
          className="prose"
          dangerouslySetInnerHTML={{ __html: html(s.content) }}
        />
        <Link className="button" href="/tours">
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
      <div className="section detail-top">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> / <Link href="/tours">Experiences</Link> /{" "}
          {s.duration}
        </div>
        <span className="eyebrow accent">
          {s.group_type === "group"
            ? "SHARED EXPERIENCE"
            : s.group_type === "private"
              ? "PRIVATE EXPERIENCE"
              : "MOROCCO EXPERIENCE"}
        </span>
        <h1>{s.title}</h1>
        <p className="lead">{s.location}</p>
      </div>
      <div className="section gallery">
        <div className="gallery-main">
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
          <div key={i} className="gallery-side">
            <Image
              src={image(p.image_path)}
              alt={String(p.alt_text || p.caption || s.title)}
              fill
              sizes="33vw"
            />
          </div>
        ))}
      </div>
      <div className="section detail-layout">
        <article>
          <div className="facts">
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
          <nav className="section-nav" aria-label="Tour sections">
            <a href="#overview">Overview</a>
            {s.days.length > 0 && <a href="#itinerary">Itinerary</a>}
            {stays.length > 0 && <a href="#stay">Stay</a>}
            {inc.length > 0 && <a href="#included">Included</a>}
            {s.faqs.length > 0 && <a href="#faq">FAQs</a>}
          </nav>
          <section id="overview" className="tour-section">
            <h2>Your experience</h2>
            <p className="lead">{text(s.hero_intro || s.excerpt)}</p>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: html(s.content) }}
            />
          </section>
          {s.days.length > 0 && (
            <section id="itinerary" className="tour-section">
              <span className="eyebrow accent">THE JOURNEY</span>
              <h2>
                {Number(s.duration_days) > 1 ? "Day by day" : "Your programme"}
              </h2>
              {s.days.map((d, i) => (
                <details className="day" key={i} open={i === 0}>
                  <summary>
                    <span className="day-number">
                      {String(d.day_number || i + 1).padStart(2, "0")}
                    </span>
                    <span>{text(d.title)}</span>
                    <span>+</span>
                  </summary>
                  <div
                    className="day-body prose"
                    dangerouslySetInnerHTML={{
                      __html: html(d.details || d.description),
                    }}
                  />
                  {Boolean(d.meals) && (
                    <p className="day-body">
                      <strong>Meals:</strong> {text(d.meals)}
                    </p>
                  )}
                </details>
              ))}
            </section>
          )}
          {stays.length > 0 && (
            <section id="stay" className="tour-section">
              <h2>Where you’ll stay</h2>
              {stays.map((a, i) => (
                <div key={i} className="stay-card">
                  {image(a.image_url) && (
                    <div className="stay-image">
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
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: html(a.description) }}
                    />
                    {Boolean(a.room_details) && <p>{text(a.room_details)}</p>}
                    {Boolean(a.upgrade_details) && (
                      <p>
                        <strong>Upgrade:</strong> {text(a.upgrade_details)}
                      </p>
                    )}
                    {Boolean(a.substitution_note) && (
                      <p className="fineprint">{text(a.substitution_note)}</p>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
          {inc.length > 0 && (
            <section id="included" className="tour-section">
              <h2>What’s included & extra</h2>
              {inc.map((x, i) => (
                <div className="include" key={i}>
                  <h3>{text(x.title)}</h3>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: html(x.details) }}
                  />
                </div>
              ))}
            </section>
          )}
          {s.departures.length > 0 && (
            <section className="tour-section">
              <h2>Scheduled departures</h2>
              <p>
                Ask our team to confirm current places and the final price for
                your party.
              </p>
              <div className="departures">
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
            <section id="faq" className="tour-section">
              <h2>Before you go</h2>
              {s.faqs.map((f, i) => (
                <details className="faq" key={i}>
                  <summary>{text(f.question)}</summary>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: html(f.answer) }}
                  />
                </details>
              ))}
            </section>
          )}
        </article>
        <aside id="availability" className="booking">
          <span className="eyebrow accent">PLAN YOUR EXPERIENCE</span>
          <div className="booking-price">
            <small>From</small>
            <strong>{money(s)}</strong>
            <span>{Number(s.price) > 0 ? "per person" : ""}</span>
          </div>
          <h2>Check availability</h2>
          <Inquiry title={s.title} url={origin + route(s)} />
          <a
            className="text-link"
            href={`mailto:Desertbrise@gmail.com?subject=${encodeURIComponent("Booking inquiry: " + s.title)}`}
          >
            Prefer email? Contact our team ↗
          </a>
        </aside>
      </div>
      <div className="mobile-booking">
        <strong>{money(s)}</strong>
        <a className="button" href="#availability">
          Check availability
        </a>
      </div>
    </main>
  );
}
