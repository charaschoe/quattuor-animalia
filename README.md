# 🎴 Quattuor Animalia

## 🐾 Über das Projekt

**Quattuor Animalia** ist ein interaktives Quartett-Kartenspiel mit wilden Tieren. Das Projekt wurde als Webentwicklungsübung erstellt und demonstriert responsive Webdesign sowie moderne JavaScript-Funktionalitäten.

## 🎯 Features

- 32 einzigartige Tierkarten
- Responsive Design für Mobile und Desktop
- Dynamische Kartengenerierung aus JSON-Daten
- Interaktive Karteneffekte beim Hover
- Remix-Funktion mit Konfetti-Animation
- Verwendung von CSS Grid und Flexbox
- Google Fonts Integration
- Wetter-Integration für Tier-Lebensräume (via Vercel Serverless Proxy)

## 🛠️ Technologien

- HTML5
- CSS3 (Grid & Flexbox)
- JavaScript/jQuery
- JSON für Datenspeicherung
- Vercel Serverless Functions (Weather API Proxy)

## 📱 Responsive Design

Das Projekt bietet zwei optimierte Ansichten:

- **Mobile**: Karten werden in einer einzelnen Spalte angezeigt
- **Desktop**: Karten werden in Vierergruppen präsentiert

## 🎮 Verwendung

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Erkunden Sie die Tierkarten durch Hover-Effekte
3. Nutzen Sie die Remix-Funktion für eine zufällige Neuanordnung der Karten

## 💻 Projektstruktur

```
quattuor-animalia/
├── api/weather.mjs         # Vercel serverless proxy for weather API
├── .env.example            # Template for OPENWEATHER_API_KEY
├── README.md
└── Quattuor Animalia/
    ├── index.html          # Main page
    ├── card.html           # Static card preview (development reference)
    ├── animaldata.json     # 32 animals, JSON array
    ├── main.js             # Card generation, shuffle, event handlers
    ├── js/weather.js       # Weather UI integration
    ├── css/
    └── images/
```

## 🎨 Design

- Responsive Layout mit CSS Grid und Flexbox
- Eingebettete Google Fonts für modernes Typografie-Design
- Interaktive Hover-Effekte auf den Karten
- Konfetti-Animation bei der Remix-Funktion

## 🤝 Mitwirken

Verbesserungsvorschläge sind willkommen! Öffnen Sie gerne einen Issue oder Pull Request.

## OpenWeather API Integration

Das Spiel verwendet die OpenWeather API, um aktuelle Temperaturdaten für die Lebensräume der Tiere anzuzeigen. Die API-Anfrage wird über einen Vercel Serverless Proxy geleitet, um den API-Schlüssel geheim zu halten.

### Setup

1. Registrieren Sie sich für einen kostenlosen API-Key bei [OpenWeather](https://openweathermap.org/api)
2. Setzen Sie die Umgebungsvariable `OPENWEATHER_API_KEY` in Ihrem Vercel-Projekt
3. Lokal: Kopieren Sie `.env.example` zu `.env` und fügen Sie Ihren API-Key ein
4. Deploy: `vercel` oder push to `main` branch

### Funktionsweise

- Jedes Tier in der `animaldata.json` hat eine `habitat_city`
- Das Frontend ruft `/api/weather?city=XXX` auf (Vercel serverless function)
- Der Proxy liest den API-Key aus Umgebungsvariablen und fragt die OpenWeather API
- Die aktuelle Temperatur wird in der oberen rechten Ecke jeder Karte angezeigt
- Die Daten werden beim Laden der Seite aktualisiert
