import Link from "next/link";
export function Header() {
  return (
    <>
      <div className="topline">
        <span>Morocco, with people who know it.</span>
        <a href="tel:+212600454881">+212 600 454 881</a>
      </div>
      <header className="header">
        <Link
          className="brand"
          href="/"
          aria-label="Morocco Tour Marrakech home"
        >
          <span className="brand-mark">✳</span>
          <span>
            MOROCCO<span className="brand-sub">TOUR MARRAKECH</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/tours">All experiences</Link>
          <Link href="/tours?category=Desert+tours">Sahara tours</Link>
          <Link href="/tours?category=Day+trips">Day trips</Link>
          <Link href="/blog">Travel journal</Link>
        </nav>
        <Link className="button outline header-contact" href="/contact-us">
          Talk to our team ↗
        </Link>
        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav>
            <Link href="/tours">All experiences</Link>
            <Link href="/blog">Travel journal</Link>
            <Link href="/contact-us">Contact</Link>
          </nav>
        </details>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link className="brand" href="/">
            MOROCCO<span className="brand-sub">TOUR MARRAKECH</span>
          </Link>
          <p>
            Shared journeys, desert nights and everyday discoveries across
            Morocco.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/tours">All tours & activities</Link>
          <Link href="/tours?category=Desert+tours">Desert tours</Link>
          <Link href="/tours?category=Day+trips">Day trips</Link>
          <Link href="/blog">Travel journal</Link>
          <Link href="/about">About us</Link>
        </div>
        <div>
          <h3>Let’s plan your trip</h3>
          <a href="tel:+212600454881">+212 600 454 881</a>
          <a href="mailto:Desertbrise@gmail.com">Desertbrise@gmail.com</a>
          <Link href="/contact-us">Contact the local team ↗</Link>
          <p>M’Hamid El Ghizlane, Zagora, Morocco</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Morocco Tour Marrakech{" "}
        <span>
          <Link href="/privacy-policy">Privacy</Link> ·{" "}
          <Link href="/terms-and-conditions">Terms</Link> ·{" "}
          <Link href="/cancellation-policy">Cancellation</Link>
        </span>
      </div>
    </footer>
  );
}
