# Terci Market and Terci Communications website

The homepage is the Terci Market storefront. Product details, visible Kwacha prices, search, categories, a persistent basket and WhatsApp checkout are available from the shop. Product data and real prices come from the existing Terci catalogue API and admin dashboard.

## Pages

- `/` — storefront and product catalogue
- `/about` — company profile, services, projects, coverage and contact details
- `/fiber` — fibre infrastructure service page
- `/admin` — protected product catalogue dashboard
- `/shop` — legacy storefront path

The basket is stored in the customer's browser. WhatsApp checkout sends the selected products and priced-items subtotal to Terci; availability, delivery and final total are confirmed with the team.

## Preview-only sample listings

The repository contains optional sample product cards for layout previews. They appear only when `VITE_TERCI_DEMO_PRODUCTS=true` is set at build time, and are visibly marked as sample prices. Production builds should leave this variable unset so only catalogue products are shown.

## Catalyst build settings

- Framework: Vite
- Root path: `./`
- Build command: `npm run build`
- Output directory: `dist`

The protected product dashboard uses Zoho Catalyst Hosted Authentication and the `terci_admin_api` Advanced I/O function.
