# Be Chill — Landing Page

![Be Chill preview]([https://github.com/user-attachments/assets/...](https://github.com/user-attachments/assets/dc11ed40-5faf-4ddf-9011-1f17fc8fc047)


**Live site:** https://thierrybwuzure.github.io/bechill_landing_page/

![Be Chill preview](https://github.com/user-attachments/assets/dc11ed40-5faf-4ddf-9011-1f17fc8fc047)

Landing page for **Be Chill Massages**, a massage and well-being salon located in Uccle, Brussels, Belgium.

Built during a **hackathon at EFP (École de Formation des Professions)** by a cross-disciplinary team of 7 designers and 3 developers working together.

---

## Team

- 7 Designers — branding, visual identity, UI/UX, assets
- 3 Developers — HTML, CSS, JavaScript

---

## Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure, accessibility |
| CSS3 | Layout, animations, responsive design |
| Vanilla JavaScript | Carousel, burger menu |
| Google Fonts | Playfair Display, DM Sans |
| Git / GitHub Pages | Version control & deployment |

No frameworks, no libraries — pure HTML/CSS/JS.

---

## Approach

**Mobile-first** — all base styles are written for mobile, with `@media (min-width: 768px)` overrides for tablet and desktop.

---

## Features

- Full-screen video hero section
- Responsive navigation with burger menu
- Services section (Massage, Head Spa, Drainage, Soin visage)
- Immersion experience section (step-by-step ritual)
- Formation / savoir-faire section
- FAQ section
- Opening hours and directions (Google Maps link)
- Customer reviews carousel
- Contact form
- Footer with social media links (TikTok, Instagram, Facebook)
- Smooth scroll navigation
- Accessibility: `aria-label`, `aria-hidden`, `aria-expanded` on interactive elements

---

## Fonts

- **Playfair Display** — headings, editorial feel
- **DM Sans** — body text, UI elements
- **Kiona** — display / accent

---

## Project Structure

```
├── index.html
├── styles.css
├── script.js
└── asset/
    ├── images (PNG, JPG, WebP)
    ├── videos (MP4)
    └── icons (SVG, PNG)
```

---

## Local Setup

No build step required. Open `index.html` directly in a browser or use a local server:

```bash
npx serve .
# or
python3 -m http.server
```
