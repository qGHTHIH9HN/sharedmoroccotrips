import Link from "next/link";
import Image from "next/image";
import { catalogue, image, text } from "@/lib/content";
export const metadata = { title: "Morocco travel journal" };
export default async function Blog() {
  const c = await catalogue();
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mb-10 [&_p]:max-w-2xl [&_p]:text-lg [&_p]:text-stone-500">
        <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8f734d]">
          THE TRAVEL JOURNAL
        </span>
        <h1>A little local knowledge.</h1>
        <p>Ideas and practical advice for your time in Morocco.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.posts.map((p) => (
          <Link
            href={`/blog/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-[#f8f7f2] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
            key={p.id}
          >
            {image(p.featured_image) && (
              <div className="relative h-60 overflow-hidden [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105">
                <Image
                  src={image(p.featured_image)}
                  alt={p.title}
                  fill
                  sizes="(max-width:640px) 100vw,33vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6 [&_h2]:mb-4 [&_h2]:text-2xl [&_p]:mb-5 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-stone-500">
              <span className="mb-4 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8f734d]">
                {text(p.category) || "Morocco travel"}
              </span>
              <h2>{p.title}</h2>
              <p>{text(p.excerpt)}</p>
              <span className="inline-flex items-center gap-2 border-b border-[#33483c]/50 pb-1 text-sm font-semibold text-[#33483c] transition hover:text-[#33483c]">
                Read the story ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
