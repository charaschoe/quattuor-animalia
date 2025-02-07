# 🎴 Quattuor Animalia

## 🐾 Über das Projekt

**Quattuor Animalia** ist ein interaktives Quartett-Kartenspiel mit wilden Tieren. Das Projekt wurde als Webentwicklungsübung erstellt und demonstriert responsive Webdesign sowie moderne JavaScript-Funktionalitäten.

## 🎯 Features

-   32 einzigartige Tierkarten
-   Responsive Design für Mobile und Desktop
-   Dynamische Kartengenerierung aus JSON-Daten
-   Interaktive Karteneffekte beim Hover
-   Remix-Funktion mit Konfetti-Animation
-   Verwendung von CSS Grid und Flexbox
-   Google Fonts Integration

## 🛠️ Technologien

-   HTML5
-   CSS3 (Grid & Flexbox)
-   JavaScript/jQuery
-   JSON für Datenspeicherung

## 📱 Responsive Design

Das Projekt bietet zwei optimierte Ansichten:

-   **Mobile**: Karten werden in einer einzelnen Spalte angezeigt
-   **Desktop**: Karten werden in Vierergruppen präsentiert

## 🎮 Verwendung

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Erkunden Sie die Tierkarten durch Hover-Effekte
3. Nutzen Sie die Remix-Funktion für eine zufällige Neuanordnung der Karten

## 💻 Projektstruktur

```
quattuor-animalia/
├── index.html
├── card.html
├── css/
│   ├── style.css
│   ├── mobile.css
│   └── desktop.css
└── animaldata.json
```

## 🎨 Design

-   Responsive Layout mit CSS Grid und Flexbox
-   Eingebettete Google Fonts für modernes Typografie-Design
-   Interaktive Hover-Effekte auf den Karten
-   Konfetti-Animation bei der Remix-Funktion

## 🤝 Mitwirken

Verbesserungsvorschläge sind willkommen! Öffnen Sie gerne einen Issue oder Pull Request.

## OpenWeather API Integration

Das Spiel verwendet die OpenWeather API, um aktuelle Temperaturdaten für die Lebensräume der Tiere anzuzeigen.

### Setup

1. Registrieren Sie sich für einen kostenlosen API-Key bei [OpenWeather](https://openweathermap.org/api)
2. Erstellen Sie eine `.env` Datei im Root-Verzeichnis
3. Fügen Sie Ihren API-Key wie folgt ein:
    ```
    OPENWEATHER_API_KEY=IhrAPIKey
    ```

### Funktionsweise

-   Jedes Tier in der `animaldata.json` hat eine `habitat_city`
-   Die API ruft die aktuelle Temperatur dieser Stadt ab
-   Die Temperatur wird in der oberen rechten Ecke jeder Karte angezeigt
-   Die Daten werden beim Laden der Seite aktualisiert

### Verwendete API-Endpunkte

-   Current Weather Data API: `https://api.openweathermap.org/data/2.5/weather`
-   Parameter:
    -   `q`: Stadtname
    -   `units`: metric (für Celsius)
    -   `appid`: API-Key
