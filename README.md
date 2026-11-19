# MusicConnect Rwanda

A React Native / Expo mobile application prototype for discovering Rwandan musicians, music releases, performances and cultural events.

## Screens and features

- Home / landing page with featured musicians, fresh sounds and upcoming event cards.
- Artist discovery with search and genre filters.
- Artist detail pages with artist information and linked music listings.
- Music release detail pages.
- Events page with save/unsave interactions.
- Profile tab placeholder.
- Bottom navigation between Home, Artists, Events and Profile.

## Folder structure

```text
app/
  _layout.jsx
  index.jsx
  explore.jsx
  events.jsx
  profile.jsx
  artist/[id].jsx
  release/[id].jsx
src/
  components/ui.jsx
  data/music.js
  screens/landingpage.json
  screens/secondpage.json
  style/globalstyles.json
  theme/colors.js
```

The JSON files in `src/screens` provide screen text/configuration. The global design tokens are stored in `src/style/globalstyles.json` and imported by `src/theme/colors.js`.

## Run in VS Code

1. Open the project folder in VS Code.
2. Open Terminal → New Terminal.
3. Install dependencies:

```bash
npm install
```

4. Start Expo:

```bash
npx expo start
```

For an Android emulator that is detected by ADB, you can use:

```bash
npx expo start --android
```

For BlueStacks, open Expo Go inside BlueStacks and connect to the development URL shown by Expo. The PC and emulator must be able to reach the Metro development server. If LAN discovery does not work, try starting Expo with `npx expo start --tunnel`.

Expo SDK 57 requires Node.js 22.13.x or newer. Check your version with `node -v`.

## Content accuracy

The artist directory contains example public artist names and brief descriptive summaries. The sample release titles, covers and event names are prototype placeholders, not verified official releases or confirmed upcoming events. Event dates, venue details, official music links, artist permissions and accurate release credits must be verified and replaced before public launch.

This version is a front-end prototype. It does not yet include a backend, artist accounts, ticket purchases, real-time event listings, licensed music playback, or persistent user profiles.
