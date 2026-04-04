# Quattuor Animalia — Wilde-Tiere-Quartett

Static card game app: 32 animal cards, German quartet game. Pure HTML/CSS/JS, no build step. Deployed on Vercel.

## Quick Start
```bash
cd "Quattuor Animalia/"
python3 -m http.server 8080
# http://localhost:8080
# Note: weather requires Vercel dev or production for /api/weather proxy
```

## Vercel Configuration
### Environment Variables
- `OPENWEATHER_API_KEY` — OpenWeather API key

### Serverless Functions
- `api/weather.mjs` — Proxies `/api/weather?city=XXX` to OpenWeather, keeps API key server-side

## Project Structure
```
quattuor-animalia/
├── api/weather.mjs         # Vercel serverless proxy (OpenWeather)
├── .env.example            # Template for OPENWEATHER_API_KEY
├── README.md
├── Quattuor Animalia/
│   ├── index.html          # Main page
│   ├── card.html           # Static card preview/template (DEAD FILE, development reference only)
│   ├── animaldata.json     # 32 animals, all numeric fields are proper numbers
│   ├── main.js             # Card generation, shuffle, event handlers
│   ├── js/weather.js       # Weather UI (calls /api/weather proxy)
│   ├── css/
│   │   ├── style.css       # Card styles, group colors, all component rules
│   │   ├── desktop.css     # Media: screen AND (min-width: 768px) → auto-fit grid
│   │   └── mobile.css      # Media: screen AND (max-width: 767px) → single column
│   └── images/
│       ├── animal images/  # a1.jpg..h4.jpg (32 images, group letter + number)
│       └── icons/          # 6 stat icon PNGs
```

## TODO

### Weather-box injection (blocked on API key setup)
`main.js` has a commented-out weather-box injection block. To re-enable:
1. Uncomment the weather-box append in `generateCards()` in `main.js`
2. The template: `<div class="weather-box"><span class="temperature-text">--°</span></div>`
3. `weather.js` already listens for `cardsRemixed` and handles updates automatically

### Performance optimization
- `weather.js` re-fetches `animaldata.json` on every `updateWeather` call — could cache globally once and reuse across cards

## Gotchas
- `card.html` is **NOT** dynamically loaded via AJAX. It's just a static HTML preview. Cards are generated in `main.js` from `animaldata.json`.
- jQuery loaded from CDN — no local fallback.
- The `#` in `index.html` (`<a href="#">`) causes page scroll-to-top on every button click.
- Numeric fields in `animaldata.json` are all proper numbers (German comma notation was fixed).
- CSS uses media-attribute loading: desktop.css loads at min-width: 768px, mobile.css at max-width: 767px.
