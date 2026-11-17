import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Users, MapPin } from "lucide-react";
import { Row, image, money, route, category } from "@/lib/content";
export default function TourCard({ tour: s }: { tour: Row }) {
  const src = image(s.featured_image);
  return (
    <Link
      href={route(s)}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#17362e]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#153e35]/12 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[1.32] overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={s.title}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1000px) 50vw,33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-stone-100 text-sm text-stone-400">
            Explore Morocco
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#153e35] backdrop-blur-sm">
          {category(s)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-stone-500">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {s.duration || "Experience"}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            {s.group_type === "group"
              ? "Shared group"
              : s.group_type === "private"
                ? "Private"
                : "Check group format"}
          </span>
        </div>
        <h3 className="mb-3 text-[21px] leading-snug font-semibold tracking-[-0.025em] text-[#153e35]">
          {s.title}
        </h3>
        <p className="mb-6 flex items-start gap-1.5 text-xs leading-6 text-stone-500">
          <MapPin className="mt-1 size-3.5 shrink-0" />
          <span>{s.location}</span>
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-stone-200/80 pt-5">
          <div>
            <span className="mr-1.5 text-[10px] text-stone-500">From</span>
            <strong className="text-2xl font-semibold tracking-tight">
              {money(s)}
            </strong>
            {Number(s.price) > 0 && (
              <span className="ml-1.5 text-[10px] text-stone-400">
                / person
              </span>
            )}
          </div>
          <span className="grid size-10 place-items-center rounded-full border border-stone-200 text-[#153e35] transition group-hover:border-[#153e35] group-hover:bg-[#153e35] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
