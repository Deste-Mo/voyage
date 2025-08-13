# Travel Booking – Monorepo

- API: `travel-booking-api` (Node.js + Express + Postgres, MVC)
- App: `travel-booking-app` (Expo React Native + NativeWind)

## Démarrage local rapide
1) API
```bash
cd travel-booking-api
cp .env.example .env
# Option 1: Docker
docker compose up --build
# Option 2: Local Postgres
npm install
node src/server.js
# API: http://localhost:3002
```
2) App
```bash
cd travel-booking-app
npm install
EXPO_PUBLIC_API_BASE_URL="http://localhost:3002" npm run web
# ou
EXPO_PUBLIC_API_BASE_URL="http://localhost:3002" npm run android
```

## Déploiement (Render + Expo)
1) Pousser sur GitHub (2 dépôts ou mono-repo):
```bash
# API
cd travel-booking-api
git init && git add . && git commit -m "init api"
# Remplacez <you> par votre compte
git remote add origin https://github.com/<you>/travel-booking-api.git
git branch -M main && git push -u origin main

# App
cd ../travel-booking-app
git init && git add . && git commit -m "init app"
git remote add origin https://github.com/<you>/travel-booking-app.git
git branch -M main && git push -u origin main
```
2) Render (API):
- Tableau de bord → New + → Blueprint → sélectionnez le repo de l’API
- `render.yaml` provisionne Postgres + service web
- Après déploiement, notez l’URL publique (ex: `https://travel-booking-api.onrender.com`)
- Variables Twilio (facultatif): `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`

3) App (Expo):
- Lancer en pointant vers l’API publique:
```bash
cd travel-booking-app
EXPO_PUBLIC_API_BASE_URL="https://travel-booking-api.onrender.com" npm run android
# ou
EXPO_PUBLIC_API_BASE_URL="https://travel-booking-api.onrender.com" npm run web
```
- Ou mettez à jour `app.json` → `expo.extra.apiBaseUrl`

## OTP
- Dev: `/register` renvoie `devOtp` si Twilio non configuré
- Prod: configurez Twilio sur Render pour envoi SMS

## Contact
- Email: modestep20.aps1a@gmail.com
- Téléphone: +261 34 74 918 85