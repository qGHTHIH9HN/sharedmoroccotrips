import Link from "next/link";
import Image from "next/image";
import { catalogue, category, image } from "@/lib/content";
import TourCard from "@/components/TourCard";
export default async function Home() {
  const c = await catalogue();
  const desired = [
    "shared-marrakech-merzouga-desert-tour-3-days",
    "shared-desert-tour-marrakech-to-fes-3-days",
    "shared-marrakech-erg-chigaga-desert-tour-3-days",
  ];
  const popular = desired
    .map((slug) => c.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const trips = c.services
    .filter((s) => category(s) === "Day trips")
    .slice(0, 3);
  const hero = image(
    "public/assets/images/intent/marrakech/sahara-morocco.jpg",
  );
  return (
    <main id="main">
      <section className="hero">
        <Image
          src={hero}
          alt="Sahara dunes in southern Morocco"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">SHARED JOURNEYS. LOCAL KNOWLEDGE.</span>
          <h1>
            A little further.
            <br />A lot more Morocco.
          </h1>
          <p>
            Cross the Atlas, follow the coast or sleep beside the Sahara dunes.
            Find your next experience—and people to share it with.
          </p>
          <Link className="button light" href="/tours">
            Find your Morocco experience ↗
          </Link>
        </div>
        <span className="hero-caption">THE SAHARA · SOUTHERN MOROCCO</span>
      </section>
      <div className="search-wrap">
        <form action="/tours" className="search">
          <label>
            Where do you want to go?
            <input name="q" placeholder="Try Merzouga, Essaouira, Agafay…" />
          </label>
          <label>
            Your kind of trip
            <select name="category">
              <option value="">All experiences</option>
              {[
                "Desert tours",
                "Day trips",
                "Activities",
                "Agafay",
                "Morocco circuits",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Explore trips ↗
          </button>
        </form>
      </div>
      <div className="trust-strip">
        <span>✓ Local Moroccan team</span>
        <span>✓ Clear prices in euros</span>
        <span>✓ Shared & private options</span>
        <span>✓ Help choosing your route</span>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">START WITH THE SAHARA</span>
            <h2>
              Big landscapes.
              <br />
              Unforgettable journeys.
            </h2>
          </div>
          <div>
            <p>
              Different routes, different rhythms. Choose the desert journey
              that fits your time in Morocco.
            </p>
            <Link className="text-link" href="/tours?category=Desert+tours">
              Explore desert tours ↗
            </Link>
          </div>
        </div>
        <div className="grid">
          {popular.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="explore-section">
        <div className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow accent">MAKE IT YOUR MOROCCO</span>
              <h2>What will you discover?</h2>
            </div>
            <p>
              From an afternoon in Marrakech to a journey across the country.
            </p>
          </div>
          <div className="category-grid">
            {[
              [
                "Desert tours",
                "The dunes are calling",
                "public/assets/images/intent/marrakech/merzouga.jpg",
              ],
              [
                "Day trips",
                "A day beyond the city",
                "public/assets/images/intent/agadir/essaouira.webp",
              ],
              [
                "Morocco circuits",
                "See how it all connects",
                "public/assets/images/intent/tangier/chefchaouen.jpg",
              ],
              [
                "Activities",
                "Make room for something new",
                "public/assets/images/destinations/marrakech.webp",
              ],
            ].map(([cat, label, src]) => (
              <Link
                href={`/tours?category=${encodeURIComponent(cat)}`}
                className="category-card"
                key={cat}
              >
                <Image
                  src={image(src)}
                  alt={cat}
                  fill
                  sizes="(max-width:640px) 80vw,25vw"
                />
                <div>
                  <small>{label}</small>
                  <h3>{cat} ↗</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">
              ONE DAY. A DIFFERENT PERSPECTIVE.
            </span>
            <h2>Step outside Marrakech.</h2>
          </div>
          <Link className="text-link" href="/tours?category=Day+trips">
            See all day trips ↗
          </Link>
        </div>
        <div className="grid">
          {trips.map((s) => (
            <TourCard key={s.id} tour={s} />
          ))}
        </div>
      </section>
      <section className="local-banner">
        <div>
          <span className="eyebrow">LET’S FIND YOUR ROUTE</span>
          <h2>
            A local conversation.
            <br />A better trip.
          </h2>
          <p>
            Unsure which desert, how many days or where to start? Tell us your
            dates and what you want to experience. Our team will help you
            choose.
          </p>
          <Link className="button light" href="/contact-us">
            Talk to our team ↗
          </Link>
        </div>
        <div className="local-note">
          <span>01</span>
          <h3>Choose your experience</h3>
          <p>Compare the route, travel time and what’s included.</p>
          <span>02</span>
          <h3>Check your dates</h3>
          <p>Ask our team to confirm availability and options.</p>
          <span>03</span>
          <h3>Travel with everything clear</h3>
          <p>Receive your confirmed arrangements before departure.</p>
        </div>
      </section>
    </main>
  );
}
