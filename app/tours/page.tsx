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
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 pb-8">
        <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#a44327]">
          EXPLORE THE COLLECTION
        </span>
        <h1>Find a journey that fits you.</h1>
        <p>
          Browse shared desert adventures, day trips and longer journeys across Morocco. Filter by destination, experience and budget to find the right route.
        </p>
      </section>
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 grid items-start gap-10 pt-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[26px] border border-[#17362e]/10 bg-white p-7 shadow-sm lg:sticky lg:top-6 [&_h2]:text-2xl [&_label]:mb-4 [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_input]:mt-2 [&_input]:min-h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_select]:mt-2 [&_select]:min-h-12 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-white [&_select]:px-3 [&_select]:py-3 [&_select]:text-sm [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-sm [&_input:focus]:outline-2 [&_input:focus]:outline-[#b34c2f] [&_select:focus]:outline-2 [&_select:focus]:outline-[#b34c2f] [&_textarea:focus]:outline-2 [&_textarea:focus]:outline-[#b34c2f]">
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
            <button className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#b34c2f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#913c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b34c2f]">
              Show experiences
            </button>
            <Link
              className="inline-flex items-center gap-2 border-b border-[#b34c2f]/50 pb-1 text-sm font-semibold text-[#153e35] transition hover:text-[#b34c2f]"
              href="/tours"
            >
              Clear filters
            </Link>
          </form>
        </aside>
        <div>
          <div className="mb-6 text-sm text-stone-500">
            {items.length} journeys available to explore {q && <>matching “{q}”</>}
          </div>
          {items.length ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              {items.map((s) => (
                <TourCard key={s.id} tour={s} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-stone-100 p-10 [&_h2]:text-3xl [&_p]:my-5">
              <h2>No experiences match those filters.</h2>
              <p>
                Try a broader search or ask our team for help with your route.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#b34c2f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#913c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b34c2f]"
              >
                Ask our team
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
