# Portfolio

Personal site — plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

| File | What it does |
|---|---|
| `index.html` | All content and page structure |
| `styles.css` | All styling. Design tokens live at the top |
| `main.js` | Mobile menu, scroll header, active nav link, copyright year |
| `assets/` | Favicon, images, CV |
| `CNAME` | Custom domain for GitHub Pages (delete if not using one) |

## Running it locally

Opening `index.html` directly works, but a local server behaves more like the
real thing (correct paths, no `file://` quirks). Python has one built in:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

Pushing to the `main` branch publishes automatically via GitHub Pages.
Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.

## Before going live

- [ ] Replace every `{{ PLACEHOLDER }}` in `index.html`
- [ ] Set the real URL in the `og:url`, `og:image` and `canonical` tags
- [ ] Add `assets/og-image.png` at 1200×630
- [ ] Add `assets/cv.pdf` or delete the link
- [ ] Check it on a phone
- [ ] Run Lighthouse (DevTools → Lighthouse) and fix anything under 95
