# Procon Lite — Website

Landing page for **Procon Lite**, a distributor of AAC blocks (bata ringan) and floor panels (panel lantai) serving East Java, Indonesia, under the Procon Persada group.

Live site: [bataringanprocon.com](https://bataringanprocon.com)

---

## Tech Stack

Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step. Self-hosted fonts (Poppins & Nunito via `.woff2`).

---

## Project Structure

```
bata-ringan-bricon-main/
├── index.html          # Single-page site — all markup, styles, and scripts
├── CNAME               # Custom domain for GitHub Pages
├── README.md
└── assets/
    ├── about/          # About Us section
    │   ├── hero.webp
    │   ├── activity-1.webp
    │   ├── activity-2.webp
    │   ├── activity-3.webp
    │   ├── icon-procon-persada.svg
    │   └── deco-hexagon.webp
    ├── benefit/        # Benefits section icons
    │   ├── icon-1.webp
    │   ├── icon-2.webp
    │   └── icon-3.webp
    ├── contact/        # Contact section
    │   ├── hero.webp
    │   ├── icon-location.webp
    │   ├── icon-phone.webp
    │   └── icon-hours.webp
    ├── footer/         # Footer assets
    │   ├── logo-white.png
    │   ├── icon-whatsapp.svg
    │   ├── icon-instagram.svg
    │   ├── icon-website.svg
    │   ├── icon-location.svg
    │   ├── icon-phone.svg
    │   └── icon-time.svg
    ├── home/           # Hero section
    │   ├── hero-desktop.webp
    │   ├── hero-mobile.webp
    │   ├── deco-hexagon-large.svg
    │   └── deco-hexagon-small.svg
    ├── navbar/         # Navbar logo and mobile menu icons
    │   ├── logo.webp
    │   ├── icon-whatsapp.svg
    │   ├── icon-home.svg
    │   ├── icon-about.svg
    │   ├── icon-benefits.svg
    │   ├── icon-product.svg
    │   └── icon-contact.svg
    ├── product/        # Product section
    │   ├── aac-block.webp
    │   ├── floor-panel.webp
    │   ├── logo-bricon.webp
    │   ├── icon-aac-block.svg
    │   ├── icon-floor-panel.svg
    │   └── icon-arrow-right.svg
    ├── fonts/          # Self-hosted Poppins & Nunito (woff2, latin subset)
    │   ├── poppins-v21-latin-100.woff2
    │   ├── poppins-v21-latin-400.woff2
    │   ├── poppins-v21-latin-500.woff2
    │   ├── poppins-v21-latin-600.woff2
    │   ├── poppins-v21-latin-700.woff2
    │   ├── poppins-v21-latin-900.woff2
    │   ├── nunito-v26-latin-600.woff2
    │   ├── nunito-v26-latin-700.woff2
    │   └── nunito-v26-latin-800.woff2
    ├── favicon.webp
    └── og-image.jpg    # Open Graph image (1200×630)
```

---

## Sections

| Section  | ID         | Description                                              |
|----------|------------|----------------------------------------------------------|
| Hero     | `#home`    | Headline, subheadline, WhatsApp CTA, stats bar           |
| Benefits | `#benefit` | Three benefit cards with floating icons                  |
| About Us | `#about`   | Company intro, link to Procon Persada, activity photos   |
| Product  | `#product` | AAC Block & Floor Panel specs, Bricon brand banner       |
| Contact  | `#contact` | WhatsApp CTA, info cards, embedded Google Maps           |
| Footer   | —          | Logo, navigation, contact info, social links             |

---

## Deployment

Deployed via **GitHub Pages** with a custom domain defined in `CNAME`.

To deploy: push to the `main` branch. GitHub Pages serves `index.html` from the root automatically.

---

## Contact

**Procon Lite**
WhatsApp: [+62 851-8402-8183](https://wa.me/6285184028183)
Address: Perumahan Puri Bagus A7/23, Sedengan Mijen, Krian, Sidoarjo, East Java
