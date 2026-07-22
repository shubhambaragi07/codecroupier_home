# CodeCroupier — Home

A standalone Vite + React project containing the CodeCroupier landing page
(hero slider, "Meet Cody" dealer section, tokenomics panel, whitepaper
section, footer — Black Diamond Protocol theme).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # to test the production build locally
```

## Folder structure

```
codecroupier-home/
├── index.html                       # Vite entry HTML (loads Google Fonts + mounts React)
├── package.json
├── vite.config.js
├── public/
│   ├── cody-hero.png                # Cody portrait (hero video poster)
│   ├── cody-chips.png                # Cody portrait for "Meet the Dealer" section
│   └── cody-loop.mp4                 # Looping hero dealer animation
└── src/
    ├── main.jsx                      # React root
    ├── App.jsx                       # Renders <CodeCroupierHome />
    └── components/
        ├── CodeCroupierHome.jsx      # The full homepage component
        └── CodeCroupierHome.css      # Scoped styles (all under .cc-home)
```

## Dropping this into your existing CodeCroupier / C-Chip dashboard project

Instead of running this as its own app, you can copy just these into your
existing Vite project:

1. `public/cody-hero.png`, `public/cody-chips.png`, `public/cody-loop.mp4`
   → into your existing project's `public/` folder
2. `src/components/CodeCroupierHome.jsx` and `.css`
   → into your existing project's `src/components/` folder
3. Import and render it from whichever route is your home page:

   ```jsx
   import CodeCroupierHome from './components/CodeCroupierHome';

   export default function HomePage() {
     return <CodeCroupierHome />;
   }
   ```

## Notes

- All CSS is scoped under a `.cc-home` wrapper class with its own
  `--cc-*` custom properties (e.g. `--cc-red`, `--cc-panel`), so it won't
  collide with an existing `theme.css` that already defines `--red`,
  `--panel`, etc.
- "Connect Wallet" and other not-yet-live buttons (Contract Address,
  Whitepaper download, Telegram/X/Discord) show a small toast rather than
  doing nothing — swap `showToast()` calls for real wallet-connect /
  routing logic when those are ready.
- Palette is the red / purple-neon / cyan "Black Diamond Protocol" theme
  from the original brief. If the project has since moved to a
  teal-green/gold palette, the CSS variables at the top of
  `CodeCroupierHome.css` are the only place you'd need to change.
