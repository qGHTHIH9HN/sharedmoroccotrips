# Morocco Tour Marrakech — Next.js public website

Tailwind design revision, 17 November 2026. Public Next.js frontend; the existing PHP dashboard and MySQL database remain authoritative.

## Run

Use Node.js 24. Run `npm ci`, copy `.env.example` to `.env.local`, then `npm run dev`. Production checks: `npm run typecheck` and `npm run build`. Start with `npm run start` (Hostinger supplies its runtime port).

## Hostinger deployment

1. Create a dedicated GitHub repository named `morocco-tours-marrakech-next`. Upload this folder's contents at repository root, including `package.json`, `package-lock.json`, `next.config.ts` and app/, components/, lib/. Exclude node_modules/ and .next/.
2. In the already-created Hostinger temporary-domain app choose Import your Git repository and select that repository.
3. Framework: Next.js. Node: 24. Install: `npm ci`. Build: `npm run build`. Start: `npm run start`. Application root: repository root.
4. Set `PHP_API_URL=https://www.moroccotourmarrakech.com/public/next-catalog.php`, `NEXT_PUBLIC_SITE_URL=https://YOUR-TEMPORARY-DOMAIN` and `SITE_INDEXABLE=false`. Redeploy after environment changes.
5. Review the temporary deployment before changing any existing domain.

## Existing PHP admin integration

The read-only adapter `php/next-catalog.php` is already installed at `public/next-catalog.php` on the existing PHP site. It loads the existing app/db.php without copying credentials. It exposes only allowlisted published public content and public tour child records. It cannot create bookings, change content, expose reviews' email addresses, or read customers. Its live source is included here for recovery; do not upload PHP into the Node.js app expecting it to execute.

- Catalogue: GET adapter?lang=en
- Tour: GET adapter?lang=en&slug=TOUR-SLUG
- Languages accepted by adapter: en, fr, es, de, it, pl, nl, ja, zh. The review frontend currently uses English only. Other languages require translated interface copy and routing before launch.
- Next.js refreshes public catalogue fetches after 60 seconds. This is time-based revalidation, not an immediate publish webhook.
- Existing /tour/SLUG and blog URLs are reused. Other published CMS pages are available at /SLUG.
- All catalogue filtering uses actual published records; no invented prices or reviews. Categories are a preliminary classification from duration/title, to be replaced with an agreed admin category mapping before production.

## Implemented

Responsive homepage; full 59-item English catalogue; keyword, category, budget and ordering filters; tour detail with actual photos, itinerary, accommodation, inclusions, FAQs and listed departures; 13 English blog posts; published CMS content pages; contact by email/WhatsApp; mobile availability CTA; HTML sanitization; safe staging robots; production sitemap toggle; error and not-found views.

Availability requests are explicitly prepared for WhatsApp and must then be sent by the visitor. No reservation or email submission is silently claimed. Email opens the visitor's mail app. Existing public/api/booking.php depends on a missing bootstrap file, so this review build deliberately does not call it. A future form integration must persist a request, return a reference, audit notification delivery and pass an authorized end-to-end test before replacing the current flow.

## Before production launch

- Review design on the temporary domain and correct any content inconsistencies in the PHP admin. Example: English Merzouga 3-day overview mentions a standard camp while stay_info names a luxury camp. No factual rewrite was silently applied.
- Complete the existing language versions and localized interface, canonical URLs and hreflang.
- Audit all previous URLs and add redirects where needed. Avoid redirecting unmatched tours to the homepage.
- Finish inquiry integration if an on-site form is required; verify actual admin persistence and delivery. Payment and instant confirmation are not implemented.
- Confirm category mapping, departure rules and capacity meanings. A listed departure is not a live seat guarantee.
- Check PHP origin placement before switching the domain: the PHP admin, API and original image files must remain reachable. If moving PHP to a backend subdomain, update PHP_API_URL and the asset origin/Next.js image allowlist together. Do not point the only PHP hostname at the Next.js app until this is arranged.
- Finish structured data and page-level canonical metadata, analytics consent and conversion tracking, policies, accessibility and performance checks.
- Only after release review set the production NEXT_PUBLIC_SITE_URL and SITE_INDEXABLE=true and rebuild.

## Verification

The production Next.js build and TypeScript check are run against the live catalogue. See VALIDATION.md for recorded checks and limitations. API edits have a persistent server backup journal; the existing public website templates were not replaced.

## Public styling

The public frontend uses Tailwind CSS v4 through the official PostCSS plugin, with utility classes directly in components. app/tailwind.css contains only the Tailwind import; the former custom globals.css stylesheet has been removed. Responsive styling covers the homepage, navigation, catalogue, tour details, inquiry controls, blog, CMS pages and footer. Lucide provides interface icons. The PHP admin and its CSS are unchanged.
