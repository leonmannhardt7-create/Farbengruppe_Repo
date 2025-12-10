# 🦡 Mood-Buddy

**Dein emotionaler Begleiter** – Eine spielerische Web-App zur bewussten Wahrnehmung deiner Emotionen.

![Mood-Buddy Preview](./docs/preview.png)

## 📖 Vision & Konzept

Mood-Buddy hilft dir, deine aktuelle Stimmung bewusst wahrzunehmen und gibt dir direkt passende Empfehlungen. Keine Texteingabe, keine Spracheingabe – nur du, deine Emotionen und ein freundliches Erdmännchen!

### Was macht Mood-Buddy?

1. **Fragt:** "Wie fühlst du dich heute?"
2. **Du wählst:** Eine oder mehrere Emotionen mit Intensität (1-10)
3. **Mood-Buddy reagiert:**
   - Erkennt deine Hauptemotion
   - Gibt einen Tipp für eine **Offline-Aktivität** (ohne digitale Medien)
   - Erzählt einen Witz, der zur Emotion passt

## 🎭 Psychologisches Modell

Die App basiert auf den **6 Basisemotionen nach Paul Ekman**:

| Emotion | Icon | Beschreibung |
|---------|------|--------------|
| Freude | 😊 | Happiness - positive Grundstimmung |
| Traurigkeit | 😢 | Sadness - niedergeschlagene Stimmung |
| Angst | 😰 | Fear - Sorgen und Unsicherheit |
| Wut | 😠 | Anger - Ärger und Frustration |
| Ekel | 🤢 | Disgust - Ablehnung und Widerwillen |
| Überraschung | 😲 | Surprise - unerwartete Ereignisse |

## 🚀 Quick Start

### Voraussetzungen

- Node.js (v18 oder höher)
- npm oder yarn

### Installation

```bash
# Repository klonen
git clone <your-repo-url>
cd Farbengruppe_Repo

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die App ist dann verfügbar unter: `http://localhost:5173`

### Build für Production

```bash
# Production Build erstellen
npm run build

# Build lokal testen
npm run preview
```

## 🏗️ Architektur

### Technologie-Stack

- **Frontend Framework:** React 18 mit TypeScript
- **Build Tool:** Vite
- **Styling:** Pure CSS (keine externe UI-Library)
- **State Management:** React Hooks (useState, useEffect)

### Projekt-Struktur

```
Farbengruppe_Repo/
├── public/                  # Statische Assets
│   └── meerkat-icon.svg    # App-Icon
├── src/
│   ├── components/         # React Komponenten
│   │   ├── AppHeader.tsx   # Titel und Untertitel
│   │   ├── MeerkatAvatar.tsx  # Animiertes Erdmännchen mit Sprechblase
│   │   ├── EmotionSelector.tsx  # Emotion-Buttons + Slider
│   │   └── MoodResult.tsx  # Ergebnis-Anzeige (Tipp + Witz)
│   ├── services/
│   │   └── moodService.ts  # Logik für Emotionsverarbeitung
│   ├── App.tsx             # Haupt-App-Komponente
│   ├── App.css             # App-Styling mit Wüsten-Theme
│   ├── index.css           # Globale Styles
│   └── main.tsx            # Entry Point
├── index.html              # HTML Template
├── package.json
├── tsconfig.json           # TypeScript Konfiguration
└── vite.config.ts          # Vite Konfiguration
```

## 🎨 Design & UX

### Ghibli-inspirierter Desert Look

Die App verwendet eine **warme, sandige Farbpalette** mit weichen Formen:

- **Hintergrund:** Wüstenlandschaft im Ghibli-Stil (Gradient + CSS)
- **Farben:** Sandtöne (#ffd89b, #f5d9b8, #e8d5c4, #d4a574, #c89461)
- **Animationen:**
  - Erdmännchen erscheint von unten (slide-up)
  - Schwebende Sprechblase (float)
  - Wackelnde Ohren und winkende Arme

### Responsive Design

✅ Desktop (1200px+)
✅ Tablet (768px - 1199px)
✅ Mobile (bis 767px)

## 🧠 moodService - Die Kern-Logik

### Datenstrukturen

```typescript
interface EmotionScore {
  key: string;      // z.B. "joy", "sadness"
  label: string;    // z.B. "Freude"
  score: number;    // 0-10
  icon: string;     // Emoji
}

interface MoodResponse {
  mainEmotion: EmotionScore;
  allEmotions: EmotionScore[];
  tip: string;      // Offline-Aktivität
  joke: string;     // Passender Witz
  message: string;  // Zusammenfassung
}
```

### Wichtige Funktionen

| Funktion | Beschreibung |
|----------|-------------|
| `determineMainEmotion()` | Ermittelt Hauptemotion (höchster Score) |
| `generateMoodResponse()` | Generiert Tipps + Witze (aktuell regelbasiert) |
| `createInitialEmotions()` | Erstellt initiale Emotion-Scores (alle auf 0) |

## 🤖 LLM-Integration (zukünftig)

Die App ist **vorbereitet für LLM-Integration**. Aktuell sind Tipps und Witze regelbasiert.

### Wo LLM integriert werden kann

In `src/services/moodService.ts` findest du ausführlich kommentierte Code-Stellen:

```typescript
// TODO: LLM-Call hier integrieren
async function generateMoodResponse(emotions: EmotionScore[]): Promise<MoodResponse> {
  // Beispiel OpenAI:
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [/* ... */]
    })
  });
  // ...
}
```

**Unterstützte LLMs:**
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude
- Google Gemini
- Lokale Modelle (Ollama, LM Studio)

### Vorteile der LLM-Integration

✅ Personalisierte Empfehlungen basierend auf Emotionskombinationen
✅ Dynamischere, kontextbezogene Witze
✅ Tieferes Verständnis von Mischgefühlen
✅ Mehrsprachigkeit
✅ Lernfähigkeit über Zeit

## 📱 Features

- ✅ **6 Basisemotionen** nach Ekman
- ✅ **Intensitäts-Slider** (1-10) für jede Emotion
- ✅ **Mehrfachauswahl** von Emotionen möglich
- ✅ **Animiertes Erdmännchen** mit Persönlichkeit
- ✅ **Offline-Aktivitäts-Tipps** (keine digitalen Medien)
- ✅ **Emotionsspezifische Witze**
- ✅ **Responsive Design** (Mobile-First)
- ✅ **Accessibility** (ARIA-Labels, Focus-States)
- ✅ **TypeScript** für Type-Safety
- ⏳ **LLM-Integration** (vorbereitet, nicht implementiert)

## 🎯 Verwendung

1. **Öffne die App** - Das Erdmännchen begrüßt dich
2. **Wähle Emotionen** - Klicke auf die Emotion-Buttons
3. **Setze Intensität** - Nutze die Slider (1-10)
4. **Stimmung anzeigen** - Klicke den Button
5. **Erhalte Feedback**:
   - Zusammenfassung deiner Gefühlslage
   - Tipp für eine Offline-Aktivität
   - Aufheiternder Witz
6. **Neu starten** - "Neue Stimmung erfassen"

## 🛠️ Entwicklung

### Scripts

```bash
npm run dev        # Development Server
npm run build      # Production Build
npm run preview    # Build lokal testen
npm run lint       # ESLint ausführen
```

### Code-Qualität

- **TypeScript** für Type-Safety
- **ESLint** für Code-Linting
- **Strict Mode** aktiviert
- **Component-based Architecture**

### Erweiterungen

#### Neuen Witz hinzufügen

In `src/services/moodService.ts`:

```typescript
const JOKES: Record<string, string[]> = {
  joy: [
    'Dein neuer Witz hier! 😄',
    // ...
  ]
}
```

#### Neuen Tipp hinzufügen

```typescript
const OFFLINE_TIPS: Record<string, string[]> = {
  joy: [
    'Dein neuer Tipp hier!',
    // ...
  ]
}
```

#### Neue Emotion hinzufügen (erweitert)

1. In `moodService.ts` → `EMOTIONS` Array erweitern
2. Tipps und Witze in `OFFLINE_TIPS` und `JOKES` ergänzen
3. Ggf. CSS anpassen für neue Farben

## 🎨 Assets & Design-Erweiterungen

### Ghibli-Style Hintergrund hinzufügen

In `src/App.css` ist die Stelle markiert:

```css
.desert-background {
  /* TODO: Ghibli-Style Bild hier einfügen */
  background-image: url('/desert-background.jpg');
  background-size: cover;
  background-position: center bottom;
}
```

**Empfohlene Tools:**
- Midjourney: "Ghibli-style desert landscape, warm colors, soft lighting"
- DALL-E: "Studio Ghibli desert with sand dunes"
- Custom Illustration

### Erdmännchen-Asset ersetzen

Das Erdmännchen ist derzeit CSS-basiert in `MeerkatAvatar.tsx`.

**Ersetzen durch:**
1. SVG-Illustration
2. PNG mit Transparenz
3. Lottie-Animation

## 🌐 Deployment

### Vercel (empfohlen)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag & Drop dist/ Ordner auf netlify.com
```

### GitHub Pages

```bash
# In vite.config.ts: base: '/repo-name/'
npm run build
# Deploy dist/ Ordner
```

## 🧪 Testing (zukünftig)

Für zukünftige Erweiterungen:

```bash
# Vitest für Unit Tests
npm install -D vitest @testing-library/react

# Playwright für E2E Tests
npm install -D @playwright/test
```

## 📄 Lizenz

Dieses Projekt wurde als **Vibe Coding Übung** erstellt.

## 🙏 Credits

- **Emotionsmodell:** Paul Ekman's Basic Emotions
- **Design-Inspiration:** Studio Ghibli
- **Icons:** Emoji (Native)
- **Framework:** React + Vite

## 🤝 Contributing

Ideen für Verbesserungen:

1. LLM-Integration implementieren
2. Mehrsprachigkeit (i18n)
3. Emotion-Historie speichern (LocalStorage)
4. Statistiken über Zeit
5. Social Sharing
6. Dark Mode (Nacht-Wüste)
7. Sound-Effekte
8. Mehr Tier-Avatare

---

**Built with ❤️ by the Mood-Buddy Team**

*Für Fragen oder Feedback: [GitHub Issues](https://github.com/yourusername/mood-buddy/issues)*
