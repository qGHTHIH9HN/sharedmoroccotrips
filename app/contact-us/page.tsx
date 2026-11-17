import { whatsapp } from "@/lib/content";
export const metadata = { title: "Contact our local Morocco team" };
export default function Contact() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20 max-w-5xl min-h-[65vh]"
    >
      <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#a44327]">
        LET’S PLAN SOMETHING GOOD
      </span>
      <h1>Start with a conversation.</h1>
      <p className="mb-6 text-lg leading-relaxed text-stone-600">
        Tell us where you want to go, your dates and how many people are
        traveling. We’ll help you find a suitable tour and confirm the details.
      </p>
      <div className="my-10 grid gap-5 md:grid-cols-2">
        <a
          className="rounded-3xl border border-stone-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg [&_h2]:text-2xl [&_p]:mt-4 [&_p]:text-stone-500"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#a44327]">
            WHATSAPP
          </span>
          <h2>Chat with our team ↗</h2>
          <p>+212 600 454 881</p>
        </a>
        <a
          className="rounded-3xl border border-stone-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg [&_h2]:text-2xl [&_p]:mt-4 [&_p]:text-stone-500"
          href="mailto:Desertbrise@gmail.com?subject=Booking%20inquiry"
        >
          <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#a44327]">
            EMAIL
          </span>
          <h2>Tell us your plans ↗</h2>
          <p>Desertbrise@gmail.com</p>
        </a>
      </div>
      <p>M’Hamid El Ghizlane, Zagora, Morocco</p>
    </main>
  );
}
