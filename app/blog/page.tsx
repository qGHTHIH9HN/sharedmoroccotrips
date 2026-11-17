import Link from "next/link";
import Image from "next/image";
import { catalogue, image, text } from "@/lib/content";
export const metadata = { title: "Morocco travel journal" };
export default async function Blog() {
  const c = await catalogue();
  return (
    <main id="main" className="section">
      <div className="catalogue-intro">
        <span className="eyebrow accent">THE TRAVEL JOURNAL</span>
        <h1>A little local knowledge.</h1>
        <p>Ideas and practical advice for your time in Morocco.</p>
      </div>
      <div className="grid">
        {c.posts.map((p) => (
          <Link href={`/blog/${p.slug}`} className="tour-card" key={p.id}>
            {image(p.featured_image) && (
              <div className="card-image">
                <Image
                  src={image(p.featured_image)}
                  alt={p.title}
                  fill
                  sizes="(max-width:640px) 100vw,33vw"
                />
              </div>
            )}
            <div className="card-body">
              <span className="eyebrow accent">
                {text(p.category) || "Morocco travel"}
              </span>
              <h2>{p.title}</h2>
              <p>{text(p.excerpt)}</p>
              <span className="text-link">Read the story ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
