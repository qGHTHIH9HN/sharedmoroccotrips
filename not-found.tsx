import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section empty">
      <span className="eyebrow accent">404</span>
      <h1>Let’s find your way.</h1>
      <p>
        This page isn’t available. Explore our current tours and activities.
      </p>
      <Link className="button" href="/tours">
        Explore experiences ↗
      </Link>
    </main>
  );
}
