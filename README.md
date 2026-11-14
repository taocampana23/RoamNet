# RoamNet — Expo / React Native app

RoamNet is a mobile app prototype based on the eight-screen HTML design supplied for this project.

## Screens

1. Splash
2. Welcome
3. Sign in
4. Create account
5. Home
6. Explore map
7. Hotspot details
8. Connection status

## Design system

- Navy: `#172D3D`
- Teal: `#1BAA91`
- Background: `#F5F5F0`
- Muted text: `#52636B`
- Borders: `#DDE3E1`

## Open the project in VS Code

Open a terminal (PowerShell, Windows Terminal, or the VS Code terminal) and run:

```bash
git clone https://github.com/taocampana23/RoamNet.git
cd RoamNet
code .
```

If `code .` is not recognized, open VS Code and use **File → Open Folder**, then select the cloned `RoamNet` folder.

Install dependencies and start Expo:

```bash
npm install
npx expo start
```

Press `w` to open the web preview, or scan the QR code with Expo Go on your Android phone. Use Node.js 22 LTS or a newer compatible release.

## Prototype functionality

- Navigation between all eight screens.
- Splash screen moves to the welcome screen.
- Welcome screen links to account creation and sign-in.
- Sign-in and account creation validate required fields and create an in-memory demo profile.
- Home search filters the included sample hotspot list.
- Explore switches between an illustrative map view and list view, selects hotspots, and opens hotspot details.
- Hotspot details opens Google Maps directions and explains provider eligibility.
- Connection status shows a simulated session timer and disconnect action.

## Important limitations

This is a **front-end prototype**, not a production Wi-Fi service.

- Hotspot records, distances, and availability are demonstration data; they are not verified live coverage.
- The Explore map is an illustrative map-style view, not a live map SDK.
- The demo account exists only in app memory. No real authentication, persistent database, password recovery, or secure account storage is connected.
- The connection screen simulates a session. It does not connect the phone to a Wi-Fi network, change Wi-Fi settings, or authenticate with a provider.
- Live hotspot discovery and Wi-Fi access require approved data/API access and integration from participating network operators.

## Next production integrations

1. Select and configure a secure authentication backend (for example, Supabase Auth or Firebase Authentication).
2. Add permission-based device location and a live map SDK.
3. Connect an approved hotspot directory/API with provider-verified availability.
4. Implement a provider-authorized Wi-Fi onboarding/authentication flow.
5. Add server-side support reporting, privacy terms, and monitoring.

No API keys, passwords, or service secrets are included. Keep private credentials in local environment configuration and never commit them to Git.
