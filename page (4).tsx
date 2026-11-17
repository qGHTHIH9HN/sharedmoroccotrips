import type { Metadata } from "next";
import Link from "next/link";
import { catalogue, category } from "@/lib/content";
import TourCard from "@/components/TourCard";
export const metadata: Metadata = {
  title: "Explore Morocco tours, day trips & activities",
};
export default async function Tours({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p = await searchParams;
  const q = String(p.q || "").slice(0, 150);
  const cat = String(p.category || "");
  const sort = String(p.sort || "recommended");
  const max = Number(p.max) || 0;
  const c = await catalogue();
  let items = c.services.filter(
    (s) =>
      (!q ||
        `${s.title} ${s.location} ${s.excerpt}`
          .toLowerCase()
          .includes(q.toLowerCase())) &&
      (!cat || category(s) === cat) &&
      (!max || (Number(s.price) > 0 && Number(s.price) <= max)),
  );
  if (sort === "price")
    items.sort(
      (a, b) => (Number(a.price) || Infinity) - (Number(b.price) || Infinity),
    );
  if (sort === "duration")
    items.sort(
      (a, b) => Number(a.duration_days || 1) - Number(b.duration_days || 1),
    );
  return (
    <main id="main">
      <section className="catalogue-intro section">
        <span className="eyebrow accent">FIND YOUR NEXT STORY</span>
        <h1>Morocco, your way.</h1>
        <p>
          Sahara journeys, coastal escapes and experiences worth making time
          for.
        </p>
      </section>
      <div className="section catalogue-layout">
        <aside className="filters">
          <form action="/tours">
            <h2>Find your experience</h2>
            <label>
              Destination or keyword
              <input
                name="q"
                defaultValue={q}
                placeholder="Where would you like to go?"
              />
            </label>
            <label>
              Experience
              <select name="category" defaultValue={cat}>
                <option value="">All experiences</option>
                {[
                  "Desert tours",
                  "Day trips",
                  "Agafay",
                  "Activities",
                  "Morocco circuits",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Maximum price per person (€)
              <input
                type="number"
                name="max"
                min="1"
                defaultValue={max || ""}
                placeholder="Any budget"
              />
            </label>
            <label>
              Sort by
              <select name="sort" defaultValue={sort}>
                <option value="recommended">Catalogue order</option>
                <option value="price">Price: low to high</option>
                <option value="duration">Shortest first</option>
              </select>
            </label>
            <button className="button">Show experiences</button>
            <Link className="text-link" href="/tours">
              Clear filters
            </Link>
          </form>
        </aside>
        <div>
          <div className="results-count">
            {items.length} experiences {q && <>matching “{q}”</>}
          </div>
          {items.length ? (
            <div className="grid catalogue-grid">
              {items.map((s) => (
                <TourCard key={s.id} tour={s} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No experiences match those filters.</h2>
              <p>
                Try a broader search or ask our team for help with your route.
              </p>
              <Link href="/contact-us" className="button">
                Ask our team
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
