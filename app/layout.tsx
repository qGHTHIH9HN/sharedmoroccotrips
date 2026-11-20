import type { Metadata } from "next";
import { Header, Footer } from "@/components/Header";
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
      <body className="motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:animate-none [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-orange-500 bg-white font-sans text-slate-900 antialiased selection:bg-orange-200 [&_h1]:mb-5 [&_h1]:font-extrabold [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:tracking-[-0.045em] sm:[&_h1]:text-5xl [&_h2]:mb-5 [&_h2]:font-bold [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:tracking-tight [&_a]:outline-offset-4 [&_button]:cursor-pointer [&_main]:pb-16 lg:[&_main]:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-white focus:p-4"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
