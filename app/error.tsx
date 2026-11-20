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
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df4a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6435]"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
