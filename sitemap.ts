import type { MetadataRoute } from "next";
import { catalogue, route, site } from "@/lib/content";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.SITE_INDEXABLE !== "true") return [];
  const c = await catalogue();
  return [
    "",
    "/tours",
    "/blog",
    "/contact-us",
    ...c.services.map(route),
    ...c.posts.map((p) => `/blog/${p.slug}`),
    ...c.pages.map((p) => `/${p.slug}`),
  ].map((p) => ({ url: site + p }));
}
