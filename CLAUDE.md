# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. No build step — files are served as-is.

## Deployment

Push to `main` branch. GitHub Pages auto-deploys. The `.nojekyll` file disables Jekyll so files are served directly.

## Architecture

Plain HTML/CSS/JS static site. No framework, no bundler, no dependencies to install.

- [style.css](style.css) — single global stylesheet used by all pages; uses CSS variables for theming and supports dark/light mode
- [index.html](index.html) — landing page; contains a small inline `<script>` that dynamically calculates PhD year from a start date
- [blog/](blog/) — blog posts use KaTeX (loaded via CDN) for math rendering
- [assets/images/gallery/](assets/images/gallery/) — images/GIFs rendered inline on the gallery page
- [assets/uploads/resume.pdf](assets/uploads/resume.pdf) — linked from the CV page as a download

All pages share the same nav structure and reference `../style.css` (or `./style.css` from the root).
