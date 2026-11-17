import { whatsapp } from "@/lib/content";
export const metadata = { title: "Contact our local Morocco team" };
export default function Contact() {
  return (
    <main id="main" className="section contact">
      <span className="eyebrow accent">LET’S PLAN SOMETHING GOOD</span>
      <h1>Start with a conversation.</h1>
      <p className="lead">
        Tell us where you want to go, your dates and how many people are
        traveling. We’ll help you find a suitable tour and confirm the details.
      </p>
      <div className="contact-options">
        <a
          className="contact-card"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="eyebrow accent">WHATSAPP</span>
          <h2>Chat with our team ↗</h2>
          <p>+212 600 454 881</p>
        </a>
        <a
          className="contact-card"
          href="mailto:Desertbrise@gmail.com?subject=Booking%20inquiry"
        >
          <span className="eyebrow accent">EMAIL</span>
          <h2>Tell us your plans ↗</h2>
          <p>Desertbrise@gmail.com</p>
        </a>
      </div>
      <p>M’Hamid El Ghizlane, Zagora, Morocco</p>
    </main>
  );
}
