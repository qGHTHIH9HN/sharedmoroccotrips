import "server-only";
import sanitizeHtml from "sanitize-html";
export const origin = "https://www.moroccotourmarrakech.com";
export const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export type Row = {
  id: number;
  title: string;
  slug: string;
  lang: string;
  url_base?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  hero_image?: string;
  price?: string | number;
  currency?: string;
  duration?: string;
  duration_days?: number;
  location?: string;
  group_type?: string;
  meta_title?: string;
  meta_description?: string;
  category_id?: number;
  [key: string]: unknown;
};
export type Child = Record<string, unknown>;
export type Tour = Row & {
  images: Child[];
  days: Child[];
  includes: Child[];
  faqs: Child[];
  accommodations: Child[];
  departures: Child[];
  translations: Child[];
};
export type Catalogue = {
  ok: boolean;
  lang: string;
  services: Row[];
  posts: Row[];
  pages: Row[];
  categories: Child[];
};
const endpoint = process.env.PHP_API_URL || `${origin}/public/next-catalog.php`;
async function request<T>(params: Record<string, string>): Promise<T> {
  const u = new URL(endpoint);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const r = await fetch(u, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Catalogue HTTP ${r.status}`);
  const data = await r.json();
  if (!data.ok) throw new Error("Catalogue unavailable");
  return data;
}
export function catalogue(lang = "en") {
  return request<Catalogue>({ lang });
}
export async function tour(slug: string, lang = "en"): Promise<Tour | null> {
  const u = new URL(endpoint);
  u.searchParams.set("slug", slug);
  u.searchParams.set("lang", lang);
  const r = await fetch(u, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error("Tour unavailable");
  return (await r.json()).service;
}
export function image(path: unknown) {
  const s = String(path || "");
  if (!s) return "";
  const cleanPath = s.replace(/^\//, "");
  const u = new URL(
    cleanPath.startsWith("assets/") ? "public/" + cleanPath : s,
    origin + "/",
  );
  return u.protocol === "https:" &&
    ["www.moroccotourmarrakech.com", "moroccotourmarrakech.com"].includes(
      u.hostname,
    )
    ? u.href
    : "";
}
export function route(s: Row) {
  const base = String(s.url_base || "tour").replace(/^\/+|\/+$/g, "");
  return `/${base}/${encodeURIComponent(s.slug)}`;
}
export function money(s: Row) {
  const n = Number(s.price);
  if (!Number.isFinite(n) || n <= 0) return "Price on request";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: s.currency || "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
export function html(value: unknown) {
  return sanitizeHtml(String(value || ""), {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
    ],
    allowedAttributes: { a: ["href", "title"] },
    allowedSchemes: ["https", "mailto", "tel"],
    transformTags: {
      a: (_t, a) => ({
        tagName: "a",
        attribs: { ...a, rel: "noopener noreferrer" },
      }),
    },
  });
}
export function text(value: unknown) {
  return sanitizeHtml(String(value || ""), {
    allowedTags: [],
    allowedAttributes: {},
  });
}
export function category(s: Row) {
  const title = s.title.toLowerCase();
  if (Number(s.duration_days) > 1)
    return Number(s.duration_days) >= 7 ? "Morocco circuits" : "Desert tours";
  if (/day trip|day hike|atlas mountains|waterfalls|valley/.test(title))
    return "Day trips";
  if (/agafay/.test(title)) return "Agafay";
  return "Activities";
}
export function whatsapp(title = "", path = "") {
  return `https://wa.me/212600454881?text=${encodeURIComponent(`Hello Morocco Tour Marrakech, I would like to check availability${title ? ` for ${title}` : ""}.${path ? ` Tour: ${origin}${path}` : ""}`)}`;
}
