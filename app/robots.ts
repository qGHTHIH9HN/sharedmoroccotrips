import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_INDEXABLE === "true"
        ? { allow: "/" }
        : { disallow: "/" }),
    },
    ...(process.env.SITE_INDEXABLE === "true"
      ? { sitemap: `${site}/sitemap.xml` }
      : {}),
  };
}
