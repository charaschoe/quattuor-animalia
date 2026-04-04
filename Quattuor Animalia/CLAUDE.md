# Quattuor Animalia — Wilde-Tiere-Quartett

Static card game app: 32 animal cards, German quartet game. Pure HTML/CSS/JS, no build step. Deployed on Vercel.

## Quick Start
```bash
cd "Quattuor Animalia/"
python3 -m http.server 8080
# http://localhost:8080
# Note: weather requires Vercel dev or production for /api/weather proxy
```

### Local Dev with Serverless Functions
```bash
npx vercel dev          # Routes api/weather.mjs correctly
```

## Linear Integration
- Bug fixes tracked in [Quattuor Animalia: Bug Fixes](https://linear.app/jw-private/project/quattuor-animalia-bug-fixes-55776ceb1f1e)
- Always add "Claude Code" label to auto-created issues
- Assign to Jonas Wienberg (ID: `5e4ef822-9d12-4bb1-b487-2d9a5105adc7`)

## TODO

### Weather-box injection (blocked on API key setup)
`main.js` has a commented-out weather-box injection block. To re-enable:
1. Uncomment the weather-box append in `generateCards()` in `main.js`
2. The template: `<div class="weather-box"><span class="temperature-text">--°</span></div>`
3. `main.js` dispatches `cardsRemixed` event; `js/weather.js` already listens for it

### Performance optimization
- `weather.js` re-fetches `animaldata.json` on every `updateWeather` call — could cache globally once

## Gotchas
- `card.html` is **NOT** dynamically loaded via AJAX. It's just a static HTML preview. Cards are generated in `main.js` from `animaldata.json`.
- jQuery loaded from CDN — no local fallback.
- The `#` in `index.html` (`<a href="#">`) causes page scroll-to-top on every button click.
- Numeric fields in `animaldata.json` are all proper numbers (German comma notation was fixed).
- CSS uses media-attribute loading: desktop.css loads at min-width: 768px, mobile.css at max-width: 767px.

## Deployment
- Push to `main` branch deploys to Vercel automatically
- Remote: `https://github.com/charaschoe/quattuor-animalia.git`
