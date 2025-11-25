# News — Multipurpose HTML Template

Premium Tailwind CSS template for service-based teams. Includes two marketing homepages, complete service + blog flows, contact & pricing pages, authentication screens, and an admin dashboard starter. Built for marketplaces like ThemeForest or direct client work.

## Preview & Development

- **Quick preview:** open `index.html` in any modern browser (double-click or drag into a tab).
- **Local server (optional):**
  ```sh
  cd news-template
  python -m http.server 3000
  # or use any static server such as `npx serve`
  ```
- **Light/Dark + RTL:** use the toggles in the global header. Preferences persist via `localStorage`.
- **Admin dashboard:** open `admin/index.html` for overview, users, orders, and messages pages.

## File Structure

- `index.html`, `home2.html`, `services.html`, `service-details.html`, `about.html`, `blog*.html`, `contact.html`, `pricing.html`, `login.html`, `register.html`, `coming-soon.html`, `404.html`, `privacy.html`, `terms.html`
- `admin/` — dashboard overview, users, orders, and messages pages
- `assets/css/styles.css` — light overrides + RTL helpers
- `assets/js/main.js` — theme/RTL toggles, mobile menu, blog filter, pricing toggle, form validation
- `assets/icons/logo-mark.svg`, `assets/img/hero-illustration.svg`
- `components/` — header/footer/card snippets for quick copy/paste
- `preview.png` — 1200×800 marketplace preview

## Customization Tips

- **Logo:** replace `assets/icons/logo-mark.svg` and update `<img>` references in headers.
- **Colors:** two palettes are defined (`brand` indigo + `accent` sky). Update the inline Tailwind config in each `<head>` or switch to a compiled build (see below) to centralize palette tweaks.
- **Copy:** search for placeholder company names like “News”, “Northwind Cloud”, etc. Provide localized Arabic lines where required.
- **Components:** reuse snippets from `/components/` to speed up bespoke pages.

## Production Tailwind Build (optional)

The template uses the Tailwind CDN for speed. For production builds:

```sh
cd news-template
npm init -y
npm install -D tailwindcss @tailwindcss/typography autoprefixer postcss
npx tailwindcss init
# edit tailwind.config.js -> content: ["./**/*.html"], extend theme, etc.
npx tailwindcss -i ./assets/css/styles.css -o ./dist/styles.css --minify
```

Update each HTML file to reference `dist/styles.css` instead of the CDN script. Remove the inline `tailwind.config` script once you rely on the compiled file.

## Licensing & Assets

- All images are simple SVG placeholders or generated previews; replace with properly licensed photography/illustrations before shipping.
- Fonts rely on system stacks; swapping in commercial fonts is optional but must respect respective licenses.
- No third-party API keys are included. Map blocks ship as placeholders—add your provider script if desired.

## Testing Checklist

- [ ] Pages open locally: `index.html`, `home2.html`, `services.html`, `service-details.html`, `about.html`, `blog.html`, `blog-details.html`, `contact.html`, `pricing.html`, `login.html`, `register.html`, `coming-soon.html`, `404.html`, admin pages.
- [ ] Mobile navigation expands/collapses on small screens.
- [ ] Theme toggle switches light/dark mode and persists on reload.
- [ ] RTL toggle flips layout/text direction and persists.
- [ ] Contact form validation shows success + error states (front-end demo).
- [ ] SEO meta tags + canonical + Open Graph exist on every page.
- [ ] Admin pages reachable under `/admin/`.

## Support & Notes

- Keyboard users can tab through menu links, toggles, and forms. Icons include `aria-label`s where needed.
- Validate Lighthouse/AXE after swapping copy or assets.
- For deployments, bundle everything except `.DS_Store`, `node_modules`, or build scripts.

Happy launching! 🎉

