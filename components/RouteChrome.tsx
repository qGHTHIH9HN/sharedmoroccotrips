"use client";
import { usePathname } from "next/navigation";
export default function RouteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return usePathname() === "/" ? null : children;
}
