import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Row, image, money, hasPrice, route, category } from "@/lib/content";
export default function TourCard({ tour: s }: { tour: Row }) {
  const src = image(s.featured_image);
  return (
    <Link
      href={route(s)}
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#9b7c51]"
    >
      <div className="relative aspect-[1.12] overflow-hidden bg-[#e9e8df]">
        {src ? (
          <Image
            src={src}
            alt={s.title}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <span className="grid h-full place-items-center text-xs text-[#667568]">
            Explore Morocco
          </span>
        )}
        <span className="absolute top-4 left-4 bg-[#f8f7f2]/95 px-3 py-1.5 text-[8px] tracking-[0.13em] uppercase text-[#33483c]">
          {category(s)}
        </span>
        <span className="absolute right-4 bottom-4 grid size-9 place-items-center border border-white/50 bg-black/10 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#33483c]">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex flex-wrap gap-3 text-[9px] font-medium tracking-[0.08em] uppercase text-[#7f877b]">
          <span>{s.duration || "Experience"}</span>
          <span>·</span>
          <span>
            {s.group_type === "group"
              ? "Shared journey"
              : s.group_type === "private"
                ? "Private journey"
                : "Ask about format"}
          </span>
        </div>
        <h3 className="mb-3 font-serif text-[29px] leading-[1.1] tracking-[-0.01em] text-[#293e32] transition group-hover:text-[#8c704a]">
          {s.title}
        </h3>
        <p className="mb-5 line-clamp-2 flex-1 text-[11px] leading-6 text-[#7a8377]">
          {s.location}
        </p>
        <div className="flex items-baseline gap-2 border-t border-[#33483c]/15 pt-4">
          {hasPrice(s) && (
            <span className="text-[10px] text-[#7a8377]">From</span>
          )}
          <strong className="text-lg font-medium tracking-tight text-[#33483c]">
            {money(s)}
          </strong>
          {hasPrice(s) && (
            <span className="text-[9px] text-[#7a8377]">per person</span>
          )}
        </div>
      </div>
    </Link>
  );
}
