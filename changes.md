# Suggested Changes

A categorized audit of improvement opportunities across the project.

---

## Bugs (Things That Are Broken)

### 1. `displayVsCode` and `displaySpotify` silently return `undefined`
**Files:** `components/apps/vscode.js:11`, `components/apps/spotify.js:9`

Both display functions are missing a `return` statement. React renders nothing and no error is thrown, so the windows open but appear blank.

```js
// current (broken)
export const displayVsCode = () => {
    <VsCode> </VsCode>   // arrow function body — not returned
}

// fix
export const displayVsCode = () => {
    return <VsCode />;
}
```

Same issue in `spotify.js`.

---

### 2. XSS filter produces malformed HTML entities
**File:** `components/apps/terminal.js:339–350`

All escape sequences are missing their trailing semicolons, so the terminal's `xss()` function outputs broken entities that browsers won't decode. This means the sanitization actually doesn't work correctly.

```js
// current (broken)
case '&': return '&amp';   // should be &amp;
case '<': return '&lt';    // should be &lt;
case '>': return '&gt';    // should be &gt;
case '"': return '&quot';  // should be &quot;
case "'": return '&#x27';  // should be &#x27;
case '/': return '&#x2F';  // should be &#x2F;
```

---

### 3. JSX block comments render as visible text on the page
**File:** `components/SEO/Meta.js:7, 22, 24, 30`

C-style `/* ... */` comments inside JSX are not treated as comments — they render as literal text nodes inside `<head>`. Search engines and browsers see this content.

```jsx
// current (wrong — renders text)
<Head>
   /* Primary Meta Tags */
   <title>...</title>
   /* Search Engine */
   ...
```

Remove these comment lines entirely; they serve no purpose.

---

### 4. Impossible condition in `checkForNewFolders`
**File:** `components/screen/desktop.js:53`

```js
if (new_folders === null && new_folders !== undefined) {
```

If `new_folders === null`, it is by definition not `undefined`, so the `&&` branch can never execute. The correct guard is `=== null || === undefined`, but since `localStorage.getItem` only returns `null` or a string, `=== null` alone suffices.

---

### 5. `displaySettings` called without required props
**File:** `components/apps/settings.js:40`

```js
export const displaySettings = () => {
    return <Settings> </Settings>;
}
```

`Settings` requires `changeBackgroundImage` and `currBgImgName` props, but this display function passes neither. The wallpaper picker will silently do nothing when opened from the sidebar. The `Settings` component is correctly wired in `window.js` via a special case, but the `displaySettings` export is still misleading and broken if used directly.

---

### 6. `og:url` is HTTP and points to `/resume` instead of the root
**File:** `components/SEO/Meta.js:35`

```html
<meta name="og:url" content="http://d3v-26.github.io/resume" />
```

Should be `https://d3v-26.github.io/` (the portfolio root, over HTTPS).

---

### 7. Typo in Walkie Talkie project description
**File:** `components/apps/dev.js:248`

```js
"imple walkie-talkie–style application..."  // missing leading 'S'
```

Should be `"Simple walkie-talkie–style application..."`.

---

### 8. YouTube link uses HTTP
**File:** `components/apps/dev.js:127`

```jsx
<a href="http://www.youtube.com/@Sidemen" ...>
```

Should use `https://`.

---

## GitHub Actions

### 9. `gh-deploy.yml` targets `master` — repo uses `main`
**File:** `.github/workflows/gh-deploy.yml:7–10`

```yaml
on:
  push:
    branches: [master]   # wrong
  pull_request:
    branches: [master]   # wrong
```

The repository default branch is `main`, so this workflow never triggers. `nextjs.yml` correctly targets `main` and uses current action versions. **`gh-deploy.yml` should be deleted** — it is superseded by `nextjs.yml`.

---

### 10. Outdated action versions in `gh-deploy.yml`
**File:** `.github/workflows/gh-deploy.yml`

| Current | Should be |
|---|---|
| `actions/checkout@v2` | `actions/checkout@v4` |
| `actions/setup-node@v2` | `actions/setup-node@v4` |
| Node.js `16.x` (EOL Sep 2023) | `20` |

Again, deleting this file (see #9) resolves all of these at once.

---

## SEO & Meta

### 11. Redundant / non-standard meta tag names for Open Graph
**File:** `components/SEO/Meta.js:31–38`

Open Graph properties should use `property=` not `name=`:

```html
<!-- current (wrong) -->
<meta name="og:title" content="..." />

<!-- correct -->
<meta property="og:title" content="..." />
```

Applies to all `og:*` tags on lines 31–38.

---

### 12. Missing canonical URL tag
**File:** `components/SEO/Meta.js`

No `<link rel="canonical" href="https://d3v-26.github.io/" />` tag. Without it, search engines may index the site under multiple URLs.

---

### 13. Keyword typo in meta keywords
**File:** `components/SEO/Meta.js:15`

```
"dev patel protfolio"  // typo — should be "portfolio"
```

---

## Content

### 14. Inconsistent LinkedIn URLs
Two different LinkedIn profile slugs appear in the codebase:

- App code uses: `https://www.linkedin.com/in/dev-patel26/`
- `README.md:47` uses: `https://www.linkedin.com/in/dev-patel-ba507a170/`

One of these is wrong. Verify which is correct and update the other.

---

### 15. Gedit (contact form) app is commented out but never properly removed
**File:** `apps.config.js:7`

```js
// import { displayGedit } from './components/apps/gedit';
```

The import is commented out, so the contact form is inaccessible, but `gedit.js` still initializes EmailJS using `process.env.NEXT_PUBLIC_USER_ID` in `componentDidMount`. The code, environment variable dependencies, and the `sendmsg` terminal command that references it (terminal.js) are all orphaned. Either re-add the app to the config or remove the file and clean up the terminal command.

---

## Dependencies

### 16. `react-ga4` is imported everywhere but all call sites are commented out
**Files:** `ubuntu.js`, `desktop.js`, `window.js`, `dev.js`, `terminal.js`, etc.

Every `ReactGA` call is commented out. The package is listed as a runtime dependency and is bundled into the output for no benefit. Either implement analytics properly or remove the package and all its imports.

```json
// package.json — remove this line if not using analytics
"react-ga4": "^2.1.0"
```

---

### 17. jQuery imported for trivial operations
**Files:** `components/apps/settings.js`, `components/apps/gedit.js`, `components/apps/terminal.js`, `components/apps/calc.js`, `components/screen/desktop.js`

jQuery adds ~87 KB (minified) to the bundle. Its usage across the project is:
- Reading input values (`$("#sender-name").val()`)
- Reading data attributes (`$(e.target).data("path")`)
- DOM lookup by ID (`$('#terminal-body')`)
- Getting element width (`$(contextMenu).width()`)

All of these have direct vanilla JS equivalents (`document.getElementById`, `element.value`, `element.dataset.path`, `element.offsetWidth`). Removing jQuery would meaningfully reduce bundle size.

---

### 18. `expr-eval` evaluates arbitrary expressions from user input
**File:** `components/apps/calc.js` (uses `Parser` from `expr-eval`)

While `expr-eval` is sandboxed compared to `eval()`, it still processes raw user-typed strings. At minimum, validate or restrict input before passing to the parser. Consider a purpose-built math expression library like `mathjs` with explicit allowed operations.

---

## Code Quality

### 19. Entire codebase uses class components
Every component is a React class component. Functional components with hooks have been the standard since React 16.8 (2019). Class components are not wrong, but they make the code more verbose, harder to test, and prevent use of hooks like `useMemo`/`useCallback` for performance optimization.

Priority candidates for conversion: `Ubuntu`, `Window`, `Desktop`, `Terminal` (the most complex ones).

---

### 20. jQuery event handlers accumulate across re-renders in Terminal and Calc
**Files:** `components/apps/terminal.js`, `components/apps/calc.js`

Both components attach jQuery `.on("input", ...)` inside methods that are called on every render cycle. Because the old handlers are never removed (`.off()` not called first), the same input triggers multiple handlers over time. This causes duplicate output and unexpected behavior the longer a session runs.

---

### 21. Direct `innerHTML` assignment with incomplete sanitization
**File:** `components/apps/terminal.js:331`

```js
document.getElementById(`row-result-${rowId}`).innerHTML = result;
```

`result` is constructed from user commands and can contain HTML (e.g. the meme `<img>` tag on line 326). The `xss()` helper is called for user-supplied input, but the broken entity encoding (see bug #2) means it provides no real protection. Fix the `xss()` function and ensure it is called on all user-controlled fragments before insertion.

---

### 22. `allWindowClosed` class property is assigned but never read
**File:** `components/screen/desktop.js:17`

```js
this.allWindowClosed = false;
```

This property is set in the constructor and never used anywhere. Remove it.

---

### 23. No `.env.example` file
**File:** missing

`components/apps/gedit.js` requires three environment variables (`NEXT_PUBLIC_USER_ID`, `NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID`). There is no `.env.example` documenting these. Anyone setting up the project locally won't know they're needed until the contact form silently fails.

---

### 24. `next.config.js` does not exist
The project uses `next export` for static output but has no `next.config.js`. At minimum it should set:

```js
// next.config.js
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },  // required for static export
};
module.exports = nextConfig;
```

Without `images: { unoptimized: true }`, using `next/image` components would fail at export time.

---

## Styles

### 25. Custom CSS redefines Tailwind color utilities with different values
**File:** `styles/index.css` (lines ~208–315)

The stylesheet manually overrides Tailwind classes like `.border-gray-300` and `.text-gray-300` with different RGB values than Tailwind's defaults. This creates a maintenance hazard: Tailwind's design system no longer behaves as documented, and any developer relying on standard Tailwind color documentation will get unexpected results. Move these overrides into `tailwind.config.js` under `theme.extend.colors` with custom names instead.

---

### 26. Google Fonts loaded with both `preload` and `stylesheet` — missing `preconnect`
**File:** `components/SEO/Meta.js:44–45`

The `preload` hint is correct, but a `preconnect` to the Google Fonts origin is missing, which is what actually speeds up the DNS + TLS handshake. Add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

---

## Images & Assets

### 27. `<img>` used throughout instead of `next/image`
The project uses plain `<img>` tags everywhere. Next.js's `<Image>` component provides automatic lazy loading, responsive sizing, and format optimization (WebP/AVIF). For a static export, setting `images: { unoptimized: true }` in `next.config.js` enables `<Image>` without a server.

High-impact locations: wallpaper thumbnails in Settings, project icons in the sidebar, background image component.

---
