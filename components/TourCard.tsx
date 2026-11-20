import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Users, MapPin } from "lucide-react";
import { Row, image, money, hasPrice, route, category } from "@/lib/content";
export default function TourCard({ tour: s }: { tour: Row }) {
  const src = image(s.featured_image);
  return (
    <Link
      href={route(s)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
    >
      <div className="relative aspect-[1.65] overflow-hidden bg-slate-100">
        {src ? (
          <Image
            src={src}
            alt={s.title}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full place-items-center text-sm text-slate-400">
            Explore Morocco
          </span>
        )}
        <span className="absolute top-3 left-3 rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm">
          {category(s)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-3 text-[10px] font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <Clock3 className="size-3" />
            {s.duration || "Experience"}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {s.group_type === "group"
              ? "Shared"
              : s.group_type === "private"
                ? "Private"
                : "Ask about format"}
          </span>
        </div>
        <h3 className="mb-3 text-[17px] leading-snug font-bold tracking-[-0.035em] text-slate-900 group-hover:text-[#df4a20]">
          {s.title}
        </h3>
        <p className="mb-5 line-clamp-2 flex-1 text-[11px] leading-5 text-slate-400">
          {s.location}
        </p>
        <div className="flex items-end justify-between gap-2 border-t border-slate-100 pt-4">
          <div>
            {hasPrice(s) && (
              <span className="mb-0.5 block text-[10px] text-slate-400">
                From / person
              </span>
            )}
            <strong
              className={
                hasPrice(s)
                  ? "text-[25px] leading-none font-extrabold tracking-tight text-slate-950"
                  : "text-base font-bold text-slate-800"
              }
            >
              {money(s)}
            </strong>
          </div>
          <span className="grid size-9 place-items-center rounded-lg bg-[#fff0e9] text-[#df4a20] transition group-hover:bg-[#ff6435] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
