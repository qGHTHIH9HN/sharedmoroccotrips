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
    <main id="main" className="bg-[#f8f7f2]">
      <section className="border-b border-[#33483c]/15 bg-[#f8f7f2]">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-12">
          <p className="mb-3 text-[10px] font-bold tracking-wider text-[#8f734d] uppercase">
            Your Morocco starts here
          </p>
          <h1 className="mb-3! font-serif! text-5xl! font-normal! sm:text-6xl!">
            A journey for every curiosity.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-[#788372]">
            From a few hours in Marrakech to a journey across the country.
            Compare experiences and find the one for you.
          </p>
          <form
            action="/tours"
            className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] [&_label]:block [&_label]:text-[10px] [&_label]:font-semibold [&_label]:text-[#788372] [&_input]:mt-1.5 [&_input]:min-h-12 [&_input]:w-full [&_input]:rounded-sm [&_input]:border [&_input]:border-[#33483c]/15 [&_input]:bg-[#f8f7f2] [&_input]:px-3 [&_input]:text-xs [&_input]:text-[#33483c] [&_select]:mt-1.5 [&_select]:min-h-12 [&_select]:w-full [&_select]:rounded-sm [&_select]:border [&_select]:border-[#33483c]/15 [&_select]:bg-[#f8f7f2] [&_select]:px-3 [&_select]:text-xs [&_select]:text-[#33483c]"
          >
            <label>
              Destination or keyword
              <input
                name="q"
                defaultValue={q}
                placeholder="Where do you want to go?"
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
            <button className="min-h-12 self-end rounded-sm bg-[#33483c] px-6 text-xs font-bold text-white transition hover:bg-[#8f734d]">
              Show experiences
            </button>
          </form>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-[#788372]">
            <strong className="text-[#33483c]">{items.length}</strong>{" "}
            experiences {q && <>matching “{q}”</>}
          </p>
          <Link href="/tours" className="text-xs font-semibold text-[#8f734d]">
            Reset filters
          </Link>
        </div>
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((s) => (
              <TourCard key={s.id} tour={s} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-[#33483c]/15 bg-[#f8f7f2] p-10 text-center">
            <h2>No trips match just yet.</h2>
            <p className="mb-6 text-sm text-[#788372]">
              Try a different destination or ask our local team for help.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex rounded-sm bg-[#33483c] px-5 py-3 text-xs font-bold text-white"
            >
              Ask a local
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
