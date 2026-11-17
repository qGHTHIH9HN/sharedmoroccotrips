import type { Metadata } from "next";
import { Header, Footer } from "@/components/Header";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Shared Morocco Tours & Experiences | Morocco Tour Marrakech",
    template: "%s | Morocco Tour Marrakech",
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
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
