# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start Next.js dev server
npm run build     # Build for production
npm run export    # Export static files to /out
npm run deploy    # Build + deploy to GitHub Pages (gh-pages -d out)
```

No linting or test scripts are configured.

## Architecture

This is a **Next.js portfolio website** styled as an interactive Ubuntu desktop environment. The site is statically exported and deployed to GitHub Pages.

### Core Concept

The entire UI simulates an Ubuntu GNOME desktop: a sidebar dock with app icons, draggable/resizable windows, right-click context menus, a terminal emulator, lock screen, and boot screen. All "apps" are React components rendered inside `Window` wrappers.

### Key Files

- **`apps.config.js`** — The central registry. Every app has an `id`, `title`, `icon` path, `favourite` (shows in sidebar), `desktop_shortcut`, and a `screen` function that returns JSX. Add/modify apps here.
- **`components/ubuntu.js`** — Top-level component managing the boot → lock screen → desktop lifecycle.
- **`components/screen/desktop.js`** — Manages window state (open, closed, minimized, focused, overlapped). Tracks an `app_stack` array and `localStorage` for frequency-based app ordering.
- **`components/base/window.js`** — Draggable window shell using `react-draggable`. Handles maximize/minimize/close animations and sidebar overlap detection.

### Component Organization

```
components/
  apps/          # App content: dev.js (About Me), terminal.js, chrome.js, spotify.js, etc.
  base/          # Reusable: window.js (window shell), ubuntu_app.js (desktop icon)
  screen/        # Layout screens: desktop.js, navbar.js, side_bar.js, lock_screen.js, booting_screen.js
  context menus/ # Right-click menus: desktop-menu.js, default.js
  util components/ # background-image.js, etc.
  SEO/           # Meta.js for SEO tags
```

### App Content Pattern

Each app in `components/apps/` exports a `display*` function that returns JSX:

```js
export const displayAboutDev = () => <AboutDev />;
```

This function is referenced as the `screen` property in `apps.config.js`. The `Window` component calls `screen()` to render the app content inside the window frame. The `settings` app is special-cased directly in `window.js`.

### Portfolio Content

The "About Dev" app (`components/apps/dev.js`) contains all portfolio content: About, Education, Skills, Projects, and Resume sections. Projects are defined as a plain JS array in that file. The Resume section embeds `https://d3v-26.github.io/resume/` in an iframe.

### Deployment

CI/CD via `.github/workflows/gh-deploy.yml`: on push to `master`, it runs `yarn build && yarn export`, adds `.nojekyll`, and deploys the `/out` directory to the `gh-pages` branch using `JamesIves/github-pages-deploy-action`.

### Styling

Tailwind CSS with custom Ubuntu-themed colors defined in `tailwind.config.js` (e.g., `bg-ub-orange`, `bg-ub-cool-grey`, `text-ubt-green`). JIT mode is enabled.
