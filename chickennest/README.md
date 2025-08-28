ChickenNest
===========

Modern, premium food-ordering website inspired by Swiggy/Zomato. Built with vanilla HTML/CSS/JS for easy hosting.

Features
--------

- Landing page with hero, featured items, subtle animations
- Responsive navbar with hamburger, cart badge, and auth button
- Menu grid with filters, dynamic cards, add-to-cart
- Cart page with quantity controls and live totals
- Dummy authentication (localStorage), login/signup modal
- Mobile-friendly, premium theme (red/orange/black/white)

Quick Start
----------

1. Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

2. Navigate between sections via the navbar or hashes: `#home`, `#menu`, `#cart`, `#about`, `#contact`.

Notes
-----

- All data is dummy and stored in `localStorage`. Clear site data to reset.
- Images are from Unsplash placeholders.

Structure
---------

- `index.html` – markup and sections
- `styles/style.css` – global styles and components
- `scripts/data.js` – menu items and categories
- `scripts/cart.js` – cart storage and helpers
- `scripts/auth.js` – simple localStorage auth
- `scripts/ui.js` – UI rendering and event handlers
- `scripts/app.js` – app bootstrap

