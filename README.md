# Dev Patel — Portfolio

An interactive portfolio website themed as an Ubuntu 20.04 desktop environment. Built with Next.js and Tailwind CSS, deployed to GitHub Pages.

**Live site:** https://d3v-26.github.io
**Dev preview:** https://d3v-26.github.io/dev

---

## Running locally

```bash
yarn install
yarn dev      # starts dev server at http://localhost:3000
```

No build step needed locally — GitHub Actions handles the production build and deployment automatically on every push to `main`.

## Deployment

| Branch | Workflow | URL |
|---|---|---|
| `main` | `nextjs.yml` | https://d3v-26.github.io |
| `development` | `dev.yml` | https://d3v-26.github.io/dev |

Both workflows push to the `gh-pages` branch. **GitHub Pages must be configured to serve from the `gh-pages` branch** (Settings → Pages → Source → Branch: `gh-pages`, folder: `/`).

## Stack

- [Next.js 14](https://nextjs.org/) — static export (`output: 'export'`)
- [Tailwind CSS](https://tailwindcss.com/) — with custom Ubuntu colour tokens
- [react-draggable](https://github.com/react-grid-layout/react-draggable) — draggable windows

## Project structure

```
apps.config.js          # central app registry — add/edit apps here
components/
  apps/                 # content for each window (terminal, chrome, spotify, etc.)
  base/                 # reusable window shell and desktop icon components
  screen/               # desktop, navbar, sidebar, lock screen, boot screen
  context menus/        # right-click menus
  util components/      # clock, background image, status bar
  SEO/                  # <head> meta tags
pages/
  index.js              # entry point — renders <Ubuntu />
public/
  themes/Yaru/          # Ubuntu icon set
  images/               # wallpapers, logos, memes
```

## Contact

[devrpatel26@gmail.com](mailto:devrpatel26@gmail.com) · [LinkedIn](https://www.linkedin.com/in/dev-patel26/) · [GitHub](https://github.com/d3v-26)
