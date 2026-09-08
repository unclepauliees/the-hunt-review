# The Hunt

A cinematic, map-led campaign review deck for NowThis x Audible's Dracula experience.

## Review

- Open `dist/the-hunt.html` directly for the self-contained offline build.
- Use **Download .pptx** for the editable 17-slide PowerPoint deck.
- Use **Export to Slides** to download the deck and open Google Slides for upload. When Google OAuth and a public asset host are configured, the same control creates the Slides deck directly.

## Development

```bash
npm install
npm run dev
```

Build the single-file HTML artifact with:

```bash
npm run build
```

## Optional Direct Google Slides Export

Set `VITE_GOOGLE_CLIENT_ID` to an OAuth client authorized for the deployed origin and set `VITE_ASSET_BASE_URL` to a public directory containing the master image assets.
