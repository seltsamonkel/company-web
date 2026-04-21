# asssk.me

Static bilingual (Japanese / English) company website for **Asssk合同会社 / Asssk LLC**, served from GitHub Pages at `https://www.asssk.me/`.

## Stack

Plain HTML / CSS / vanilla JS. No build step, no dependencies. Language toggle is a small script that swaps `data-ja` / `data-en` attributes and persists the choice in `localStorage`.

## Layout

```
index.html
assets/
  css/styles.css
  js/i18n.js
CNAME               # custom domain for GitHub Pages
.nojekyll           # tell Pages not to run Jekyll
robots.txt
sitemap.xml
```

## Local preview

Any static server works. Easiest:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Or with Node:

```sh
npx http-server -p 8000 .
```

## Deployment

1. Push `main` to `https://github.com/seltsamonkel/company-web`.
2. In the repo Settings → Pages:
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
   - Custom domain: `www.asssk.me` (already set via the `CNAME` file)
3. Update DNS at your registrar so `www.asssk.me` points to GitHub Pages. Either:
   - `CNAME` record: `www` → `seltsamonkel.github.io`
   - or four `A` records on the apex plus a `CNAME` for `www`; see GitHub's custom domain docs for current IPs.
4. Turn on **Enforce HTTPS** in the Pages settings once the certificate has been issued (may take a few minutes after DNS propagates).

The current DNS for `www.asssk.me` still points at the old WordPress host. The new site will only go live once DNS is updated.

## Contact form

The form posts to [Formspree](https://formspree.io/). Before it works, replace the placeholder in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Sign up on Formspree, create a form endpoint, set `info@asssk.me` as the recipient, and paste the real ID. Until then, submissions will 404.

## Editing content

All user-visible strings live inline in `index.html` with both languages side-by-side:

```html
<h2 data-ja="会社概要" data-en="Company">会社概要</h2>
```

The `textContent` shown initially is the Japanese version (matches `<html lang="ja">`). `assets/js/i18n.js` swaps to the chosen language on load.
