import Link from "next/link";
export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 min-h-[50vh]"
    >
      <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#a44327]">
        404
      </span>
      <h1>Let’s find your way.</h1>
      <p>
        This page isn’t available. Explore our current tours and activities.
      </p>
      <Link
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#b34c2f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#913c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b34c2f]"
        href="/tours"
      >
        Explore experiences ↗
      </Link>
    </main>
  );
}
