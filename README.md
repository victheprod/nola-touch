# Nola Touch

Premium digital beauty supply store for Black women — wigs, extensions, hair care, styling products, and beauty essentials.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** primitives + **Framer Motion** + **Lucide Icons**
- **Playfair Display** (serif headings) + **Inter** (body) via `next/font`

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Gold | `#FCD76B` | Primary brand, CTAs |
| Black | `#0A0A0A` | Secondary, hero/footer |
| Ivory | `#FAF7F2` | Page background |
| Champagne | `#F5EFE6` | Section backgrounds |
| Stone | `#E8E4DE` | Borders, dividers |
| Charcoal | `#2B2B2B` | Body text accent |

## Getting Started

Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

This project uses **no environment variables** — it runs entirely on static
content and requires no secrets, API keys, or external services to build or run.
See `.env.example` (empty by design). If you later add integrations (payments,
CMS, analytics), document their keys there and set them in the Vercel dashboard.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── globals.css       # Design tokens & Tailwind theme
│   ├── layout.tsx        # Root layout with fonts, header, footer
│   └── page.tsx          # Homepage
├── components/
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, footer, mobile menu
│   └── ui/               # Reusable UI (Button, ProductCard, etc.)
├── data/                 # Product, category, review data
└── lib/                  # Utilities
```

## Homepage Sections

1. Hero — headline, CTAs, trust indicators
2. Featured Categories — 6 shop categories
3. Best Sellers — top products grid
4. New Arrivals — latest products
5. Brand Promise — why shop with Nola Touch
6. Product Education — hair guides
7. Customer Reviews — verified testimonials
8. Newsletter — email signup
9. Footer — shop links, help, social

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Deployment (Vercel)

This project is a standard Next.js app and deploys to Vercel with zero extra
configuration.

1. Push the repository to GitHub.
2. In [Vercel](https://vercel.com/new), import the GitHub repo.
3. Vercel auto-detects the settings below — no changes needed:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | (default — managed by Next.js) |
| Environment Variables | none required |

4. Click **Deploy**. Every push to the default branch ships to production, and
   pull requests get automatic preview deployments.

To build and run the production server locally:

```bash
npm run build
npm run start
```
