import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Compass, MapPin, Search, Users, ShieldCheck, Sparkles, Clock3, MessageCircle } from "lucide-react";
import { catalogue, category, image } from "@/lib/content";
import TourCard from "@/components/TourCard";

const destinations = [
  { name: "Sahara Desert", note: "Dunes, desert camps & open skies", src: "public/assets/images/intent/marrakech/merzouga.jpg", href: "/tours?category=Desert+tours", wide: true },
  { name: "Atlas Mountains", note: "Mountain roads & village life", src: "public/assets/images/intent/marrakech/ait-ben-haddou.jpg", href: "/tours?q=atlas", wide: false },
  { name: "Coastal Escapes", note: "Atlantic air & seaside towns", src: "public/assets/images/intent/agadir/essaouira.webp", href: "/tours?q=essaouira", wide: false },
];
const categories = [
  { name: "Shared Sahara tours", detail: "Travel together, experience more", href: "/tours?category=Desert+tours", number: "01" },
  { name: "Day trips", detail: "Discover beyond Marrakech", href: "/tours?category=Day+trips", number: "02" },
  { name: "Morocco circuits", detail: "More days, more discoveries", href: "/tours?category=Morocco+circuits", number: "03" },
  { name: "Activities", detail: "Memorable moments along the way", href: "/tours?category=Activities", number: "04" },
];
export default async function Home() {
  const c = await catalogue();
  const featuredSlugs = ["shared-marrakech-merzouga-desert-tour-3-days", "shared-desert-tour-marrakech-to-fes-3-days", "shared-marrakech-erg-chigaga-desert-tour-3-days"];
  const featured = featuredSlugs.map(slug => c.services.find(s => s.slug === slug)).filter((s): s is (typeof c.services)[number] => Boolean(s));
  const picks = featured.length ? featured : c.services.filter(s => category(s) === "Desert tours").slice(0, 3);
  const dayTrips = c.services.filter(s => category(s) === "Day trips").slice(0, 3);
  return (
    <main id="main" className="overflow-hidden">
      <section className="relative isolate min-h-[690px] bg-[#112e28] text-white lg:min-h-[780px]">
        <Image src={image("public/assets/images/intent/marrakech/sahara-morocco.jpg")} alt="Sahara dunes in Morocco" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081b18]/95 via-[#102a24]/75 to-[#102a24]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081b18]/60 via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[690px] max-w-7xl flex-col justify-center px-6 pb-36 pt-20 sm:px-10 lg:min-h-[780px] lg:px-14">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em] text-[#f0d4aa]">
            <span className="h-px w-10 bg-[#f0d4aa]" /> Curated journeys across Morocco
          </div>
          <h1 className="max-w-[980px] font-serif text-[clamp(3.6rem,8.5vw,8rem)] leading-[.98] tracking-[-.055em] text-white">
            The best stories <span className="block italic text-[#efd0a2]">are shared.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            Discover Morocco through extraordinary landscapes, thoughtfully planned routes and the people you meet along the way.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/tours" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#dfb77e] px-7 text-sm font-bold text-[#17362e] transition hover:bg-white">
              Explore all trips <ArrowUpRight className="size-4" />
            </Link>
            <Link href="/contact-us" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/40 px-7 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to our team <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="absolute bottom-20 right-8 hidden items-center gap-3 text-[11px] uppercase tracking-[.18em] text-white/65 lg:flex"><span className="h-px w-10 bg-white/50" /> Southern Morocco</div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-5 sm:px-8">
        <form action="/tours" className="grid gap-5 rounded-[28px] border border-[#17362e]/10 bg-white p-6 shadow-[0_25px_75px_rgba(10,38,30,.17)] sm:p-8 lg:grid-cols-[1.4fr_1fr_auto] lg:items-end">
          <label className="block text-xs font-bold text-[#17362e]"><span className="mb-3 flex items-center gap-2"><MapPin className="size-4 text-[#ac5737]" /> Where do you want to go?</span><input name="q" placeholder="Merzouga, Atlas, Essaouira…" className="min-h-12 w-full rounded-xl border border-[#17362e]/15 bg-[#faf8f3] px-4 text-sm font-normal outline-offset-4" /></label>
          <label className="block text-xs font-bold text-[#17362e]"><span className="mb-3 flex items-center gap-2"><Compass className="size-4 text-[#ac5737]" /> Type of experience</span><select name="category" className="min-h-12 w-full rounded-xl border border-[#17362e]/15 bg-[#faf8f3] px-4 text-sm font-normal"><option value="">All experiences</option>{["Desert tours","Day trips","Morocco circuits","Agafay","Activities"].map(x => <option key={x}>{x}</option>)}</select></label>
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#17362e] px-7 text-sm font-bold text-white transition hover:bg-[#285646]"><Search className="size-4" /> Find a trip</button>
        </form>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-14 sm:grid-cols-3 sm:px-10 lg:px-14 lg:py-20">
        {[{icon:Users,heading:"Shared experiences",body:"Explore Morocco with fellow travelers."},{icon:Compass,heading:"Local perspective",body:"Routes shaped by knowledge of the country."},{icon:ShieldCheck,heading:"Clear trip details",body:"See itineraries and request availability directly."}].map(({icon:Icon,heading,body}) => <div key={heading} className="flex items-start gap-4 border-b border-[#17362e]/10 pb-5 sm:border-b-0 sm:border-r sm:pr-5 last:border-r-0"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e9e4d8]"><Icon className="size-5" /></span><div><h2 className="!mb-1 !font-sans !text-base !font-bold">{heading}</h2><p className="text-sm leading-6 text-[#5f6b63]">{body}</p></div></div>)}
      </section>

      <section className="bg-[#f0eee7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#a94e32]">Explore the possibilities</p><h2 className="!mb-0 max-w-2xl !text-[clamp(2.6rem,5vw,4.8rem)] !leading-[1.05]">A different side of <em>Morocco.</em></h2></div>
            <p className="max-w-xs text-sm leading-7 text-[#5e6960]">From desert horizons to mountain villages and the Atlantic coast, find a journey that speaks to you.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d,i) => <Link key={d.name} href={d.href} className={`group relative min-h-[390px] overflow-hidden rounded-[26px] ${i===0 ? "lg:col-span-2" : ""}`}><Image src={image(d.src)} alt={d.name} fill sizes={i===0 ? "(max-width:1024px) 100vw,50vw" : "(max-width:1024px) 100vw,25vw"} className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#081b18]/85 via-transparent to-black/10" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white"><div><p className="mb-2 text-xs text-white/75">{d.note}</p><h3 className="font-serif text-3xl">{d.name}</h3></div><span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/60"><ArrowUpRight className="size-5" /></span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#a94e32]">Start your adventure</p><h2 className="!mb-0 !text-[clamp(2.6rem,5vw,4.6rem)]">Popular journeys</h2></div><Link href="/tours" className="inline-flex items-center gap-2 border-b border-[#17362e] pb-2 text-sm font-bold">View all journeys <ArrowUpRight className="size-4" /></Link></div>
        {picks.length ? <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{picks.map(s => <TourCard key={s.id} tour={s} />)}</div> : <p className="text-sm text-[#65736a]">Explore the full catalogue to see available experiences.</p>}
      </section>

      <section className="bg-[#17362e] py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-14">
          <div><p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#dfb77e]">Find your travel style</p><h2 className="!mb-6 !text-[clamp(2.6rem,5vw,4.5rem)] !leading-[1.08] !text-white">One country. <em>So many ways</em> to explore.</h2><p className="max-w-md text-sm leading-8 text-white/65">Whether you have a day or a week, discover the experiences that fit your time and interests.</p><Link href="/tours" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#dfb77e]">Browse the collection <ArrowUpRight className="size-4" /></Link></div>
          <div className="divide-y divide-white/15 border-y border-white/15">{categories.map(d => <Link key={d.name} href={d.href} className="group flex items-center gap-5 py-7 transition hover:pl-2"><span className="text-xs text-[#dfb77e]">{d.number}</span><div className="flex-1"><h3 className="text-xl font-semibold sm:text-2xl">{d.name}</h3><p className="mt-1 text-xs text-white/55">{d.detail}</p></div><ArrowUpRight className="size-5 text-[#dfb77e] transition group-hover:translate-x-1" /></Link>)}</div>
        </div>
      </section>

      {dayTrips.length > 0 && <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#a94e32]">Short escapes</p><h2 className="!mb-0 !text-[clamp(2.6rem,5vw,4.6rem)]">One day, a new perspective.</h2></div><Link href="/tours?category=Day+trips" className="inline-flex items-center gap-2 border-b border-[#17362e] pb-2 text-sm font-bold">Explore day trips <ArrowUpRight className="size-4" /></Link></div><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{dayTrips.map(s => <TourCard key={s.id} tour={s} />)}</div></section>}

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-14 lg:pb-28"><div className="grid overflow-hidden rounded-[32px] bg-[#e8ddcc] lg:grid-cols-2"><div className="relative min-h-[330px] lg:min-h-[490px]"><Image src={image("public/assets/images/intent/marrakech/ait-ben-haddou.jpg")} alt="Traditional architecture in southern Morocco" fill sizes="(max-width:1024px) 100vw,50vw" className="object-cover" /></div><div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"><p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#a94e32]"><Sparkles className="size-4" /> Travel with a local perspective</p><h2 className="!mb-5 !text-[clamp(2.5rem,4vw,4rem)] !leading-[1.08]">Your journey starts with a conversation.</h2><p className="max-w-md text-sm leading-8 text-[#526359]">Not sure which route or how many days? Tell us what you have in mind. We'll help you explore the options and confirm the details before you travel.</p><Link href="/contact-us" className="mt-8 inline-flex min-h-14 w-fit items-center gap-3 rounded-full bg-[#17362e] px-7 text-sm font-bold text-white transition hover:bg-[#285646]"><MessageCircle className="size-4" /> Plan your trip <ArrowUpRight className="size-4" /></Link></div></div></section>
    </main>
  );
}
