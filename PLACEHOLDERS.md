
## Food security section (11 Nov 2026)
- Home page Food Security section has no photos yet: add Cloudinary links to `src/content/food-security.json` → photos (first one shows large). The section is complete without them.
- "What partners receive" lists reporting commitments: confirm with ACCAH.

## Share previews (11 Nov 2026)
- [ ] Share cards in `public/social/` are designed text cards (no real photos available). Replace with real ACCAH photos when the client sends them, and update `src/content/seo.json` + `src/lib/seo.ts`.
- [ ] Confirm https://accah.org is the official address (arkofhope.ca was in the old code). If the client also owns arkofhope.ca, point it at accah.org with a redirect.
- [ ] No social media accounts are listed anywhere yet; add them to `SITE.social` in `src/lib/seo.ts` once confirmed.

## Contact details (11 Nov 2026, from the client)
- [x] Phone +1 (438) 282-7441 and address 101 West Drive, Unit 7, Brampton, ON L6T 2J6 (replaces 6850 Milcreek Drive, Mississauga): in `src/lib/contact.ts`, used in the footer, Contact page and Google structured data.
- [ ] Service hours and social links: removed from view until confirmed (they showed as "[to be added]").
- [ ] Still visible as placeholders: board/team profiles (About), program descriptions (Our Work), partner logos (Partners), tax-receipt information (Donate), some FAQ answers.
- 16 unused files left over from the Crowned template (pages, forms, footer with Crowned's email/address) were deleted; the type check is now clean.
