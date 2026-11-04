# Crowned Women and Family Community Services (CWFCS)

## 1. Project Description
Flagship bilingual (EN/FR) website for a women-led, culturally responsive non-profit in Mississauga, Ontario. Audience: women, girls, families, newcomers, plus funders, sponsors and partners. Core value: show credibility, reach, programs and an easy path to contact, volunteer, partner or give.

## 2. Page Structure
- `/` - Home (scroll-driven film chapter + full-screen parallax panels + inquiry form)
- `/about` - Our legacy, values, leadership team, who we serve
- `/services` - Six programs + service inquiry form
- `/cgirls` - CGIRLS flagship program
- `/events` - Filterable events list + RSVP modal
- `/partners` - Partners grid and partnership types
- `/get-involved` - Volunteer / network form + donate panel
- `/contact` - Contact card, inquiry form, map, FAQ
- `*` - Branded 404

## 3. Core Features
- [x] Instant EN/FR toggle saved in localStorage, html lang updated
- [x] Scroll-scrubbed hero film with 5 acts
- [x] Parallax image panels, reveal-on-scroll, pointer parallax
- [x] Service Inquiry, Volunteer and Event RSVP forms (built-in Forms)
- [ ] Donation processor connection (CanadaHelps / Stripe — to be decided)

## 4. Data Model Design
No database needed. Form submissions are collected by the built-in Forms feature.

## 5. Backend / Third-party Integration Plan
- Database: not needed now
- Donations: placeholder link, connect later
- Forms: built-in Forms

## 6. Development Phase Plan
### Phase 1: Full site build (done)
- All 8 pages, header, footer, bilingual system, 3 forms, 404
### Phase 2: Content confirmation
- Replace placeholders (charity number, social links, partner logos, real photos)
### Phase 3: Donations
- Connect a donation processor