import Link from "next/link";
import Image from "next/image";
import { Row, image, money, route, category } from "@/lib/content";
export default function TourCard({ tour: s }: { tour: Row }) {
  const src = image(s.featured_image);
  return (
    <Link href={route(s)} className="tour-card">
      <div className="card-image">
        {src ? (
          <Image
            src={src}
            alt={s.title}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1000px) 50vw,33vw"
          />
        ) : (
          <div className="image-placeholder">Explore Morocco</div>
        )}
        <span className="tag">{category(s)}</span>
      </div>
      <div className="card-body">
        <div className="eyebrow muted">
          {s.duration || "Experience"} ·{" "}
          {s.group_type === "group"
            ? "Shared experience"
            : s.group_type === "private"
              ? "Private experience"
              : "Check group format"}
        </div>
        <h3>{s.title}</h3>
        <p className="route-line">{s.location}</p>
        <div className="card-bottom">
          <span>
            <small>From</small>
            <strong>{money(s)}</strong>
            <small>{Number(s.price) > 0 ? "per person" : ""}</small>
          </span>
          <span className="arrow-circle">↗</span>
        </div>
      </div>
    </Link>
  );
}
