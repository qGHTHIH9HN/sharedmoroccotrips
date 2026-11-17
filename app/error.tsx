"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 min-h-[50vh]"
    >
      <h1>We couldn’t load the catalogue.</h1>
      <p>Please try again, or contact our team on +212 600 454 881.</p>
      <button
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#b34c2f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#913c24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b34c2f]"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
