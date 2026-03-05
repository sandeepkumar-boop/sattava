# Sattva E-com — Figma to Shopify Theme Structure

Based on Figma design: **Home_ver2** (node 101-9428)

## Design tokens (from Figma)

| Token | Value | Usage |
|-------|--------|--------|
| Primary (burgundy) | `#601115` | Buttons, accents |
| Announcement green | `#6B4C2D` | Top bar background |
| Heading black | `#000000` | Headings |
| Body gray | `#282828` | Body text |
| Border radius (buttons) | `6px` | Buttons |
| Border radius (cards) | `5px` | Category cards, images |
| Section background | Light/cream | The Sattva Way, Facts |
| Footer background | Dark | Footer |

### Typography
- **Headings**: Playfair Display, 600, 40px (section), 45px (hero), 24px (card title)
- **Body**: Instrument Sans, 400/600, 16px
- **Logo**: League Spartan, 700, 32px

---

## Sections (in page order)

| # | Section file | Description |
|---|-----------------------------|-------------|
| 1 | `sattva-announcement-bar.liquid` | Green bar, white text, single line |
| 2 | `sattva-hero-banner.liquid` | Two-panel hero (50/50), overlay header area |
| 3 | `sattva-shop-by-category.liquid` | "Shop By Category" + 4 category cards (blocks) |
| 4 | `sattva-the-sattva-way.liquid` | Heading, bullet list, "Know More", image/slider |
| 5 | `sattva-facts-figures.liquid` | 4 stat blocks (numbers + labels) |
| 6 | `sattva-image-with-text.liquid` | "New Collection / Earth Story" + CTA + image |
| 7 | `sattva-product-slider.liquid` | Quote + product carousel |
| 8 | `sattva-gifting-cta.liquid` | "Thoughtful gifts" copy + image + CTA |
| 9 | (existing) `newsletter.liquid` | Stay Updated + email + Subscribe |
| 10 | (existing) `footer.liquid` | Logo, columns, newsletter, copyright |

---

## Suggested theme structure

```
/sections
  sattva-announcement-bar.liquid
  sattva-hero-banner.liquid
  sattva-shop-by-category.liquid
  sattva-the-sattva-way.liquid
  sattva-facts-figures.liquid
  sattva-image-with-text.liquid
  sattva-product-slider.liquid
  sattva-gifting-cta.liquid
  (existing sections...)

/snippets
  (existing + optional sattva-specific snippets)

/assets
  section-sattva-announcement-bar.css
  section-sattva-hero-banner.css
  section-sattva-shop-by-category.css
  section-sattva-the-sattva-way.css
  section-sattva-facts-figures.css
  section-sattva-image-with-text.css
  section-sattva-product-slider.css
  section-sattva-gifting-cta.css

/templates
  index.json   ← Add Sattva sections in desired order

/layout
  theme.liquid  (unchanged)
```

---

## Homepage template

Use **index.sattva.json** as the homepage template:

1. In Shopify admin: Online Store → Themes → Customize.
2. Open the homepage (or set the default template for the home page to **sattva**).
3. Section order in the template: `sattva-announcement-bar` → `sattva-hero-banner` → `sattva-shop-by-category` → `sattva-the-sattva-way` → `sattva-facts-figures` → `sattva-image-with-text` → `sattva-product-slider` → `sattva-gifting-cta` → `newsletter`.

Header and footer are rendered by the theme layout (header-group / footer-group), not by this template.
