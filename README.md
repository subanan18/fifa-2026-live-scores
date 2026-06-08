# FIFA 2026 Live Scores Website

A professional static website for FIFA World Cup 2026 live scores. It is ready for GitHub Pages and includes:

- Responsive HTML, CSS, and JavaScript
- Professional SVG visuals included in `/assets`
- Demo match data so the site works immediately
- Refresh button and auto-refresh every 60 seconds
- Clear place to connect a real live-score API

## Upload to GitHub

1. Unzip this project.
2. Create a new GitHub repository.
3. Upload all files: `index.html`, `styles.css`, `app.js`, `README.md`, and the `assets` folder.
4. Go to **Settings → Pages**.
5. Choose **Deploy from branch**, select `main`, and save.

## Connect real live scores

Open `app.js` and update:

```js
const API_MODE = "custom";
const CUSTOM_ENDPOINT = "https://your-backend.com/api/worldcup/live";
```

Important: paid API keys should not be exposed directly in public browser code. Use a small backend/proxy to keep keys private.

Possible providers include API-Football, Sportmonks, Live-Score API, Statorium, or TheSportsDB depending on your budget and license needs.
