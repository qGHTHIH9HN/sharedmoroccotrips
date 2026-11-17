"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="section empty">
      <h1>We couldn’t load the catalogue.</h1>
      <p>Please try again, or contact our team on +212 600 454 881.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
