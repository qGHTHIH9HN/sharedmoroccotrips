import type { Metadata } from "next";
import { Header, Footer } from "@/components/Header";
import RouteChrome from "@/components/RouteChrome";
import "@fontsource-variable/dm-sans";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./tailwind.css";
export const metadata: Metadata = {
  title: {
    default: "Shared Morocco Tours & Experiences | Shared Morocco Trips",
    template: "%s | Shared Morocco Trips",
  },
  description:
    "Find shared Sahara tours, Morocco circuits, day trips and Marrakech activities. Compare routes and prices, then check availability with our local team.",
  robots:
    process.env.SITE_INDEXABLE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth scroll-pt-20">
      <body className="bg-[#f8f7f2] font-sans text-[#33483c] antialiased selection:bg-[#d6c6a7] [&_h1]:mb-6 [&_h1]:font-serif [&_h1]:font-normal [&_h1]:text-5xl [&_h1]:leading-[1.05] [&_h1]:tracking-tight sm:[&_h1]:text-6xl [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:text-4xl [&_h2]:leading-tight [&_h2]:tracking-tight [&_a]:outline-offset-4 [&_button]:cursor-pointer [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-[#94764c] motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:animate-none [&_main]:pb-16 lg:[&_main]:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-white focus:p-4"
        >
          Skip to content
        </a>
        <RouteChrome>
          <Header />
        </RouteChrome>
        {children}
        <RouteChrome>
          <Footer />
        </RouteChrome>
      </body>
    </html>
  );
}
