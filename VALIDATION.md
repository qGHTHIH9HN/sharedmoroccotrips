# Validation — 17 November 2026

## Passed

- Live read-only catalogue adapter: HTTP 200; 59 English services, 13 posts, 21 pages.
- Live Merzouga tour detail: HTTP 200; 5 photos, 3 itinerary days, 8 include rows, 2 accommodation rows, 7 FAQs. No upcoming departure rows were returned for this tour; no dates or capacity were invented.
- Tour photograph normalized from stored assets/uploads path to public/assets/uploads: HTTP 200.
- All five homepage/category photographs checked: HTTP 200, JPEG/WebP image responses.
- Next.js production build and TypeScript validation succeeded.
- Production-server HTTP checks: home 200 (6 featured tour cards), catalogue 200 (59 cards), day-trip filter 200 (8 cards), nonexistent keyword 200 (0 cards), Merzouga detail 200, blog 200 (13 cards), contact 200, privacy 200, unknown URL 404, robots.txt 200.
- Staging HTML contains noindex metadata.
- PHP source syntax accepted by the website edit service; live adapter output confirms runtime execution.
- Existing PHP templates, prices, admin records and URLs were not edited. A new public read-only adapter was added, with persistent rollback journal ID a8b020cc4955485a9648397805b8a647.

## Not yet verified / not implemented

- Browser visual, mobile interaction and JavaScript handoff checks: Chromium could not launch due to execution-environment socket restrictions. Desktop/mobile CSS is implemented, but visual QA must happen on the temporary deployment. No Lighthouse score is claimed.
- Hostinger deployment has not occurred. A dedicated project GitHub repository has not been selected or created; no unrelated existing repository was modified.
- English review frontend only; other stored languages require interface translation and routing before launch.
- WhatsApp availability request preparation is implemented; it is not a persisted booking. No email was sent and no client booking record was created during testing.
- Missing existing public/api/_bootstrap.php prevents reliance on the old booking API; the build does not use it.
- Existing content has factual inconsistencies requiring owner review, including standard vs luxury camp language on the Merzouga tour.
- Production domain transition, backend/asset hostname separation, redirects, canonical/hreflang, structured data, analytics and payment/seat inventory integration remain release work.

## Tailwind revision

All public custom selectors were replaced with Tailwind utilities. The stylesheet now contains only the Tailwind import. Next.js production build passed with the Tailwind PostCSS integration. Visual browser validation remains pending because Chromium cannot launch under this execution environment.
