# Travel Booking App (React Native + Expo)

## Prérequis
- Node 20+
- Expo CLI (optionnel)

## Installation
```bash
npm install
```

## Démarrage
- Assurez-vous que l'API tourne sur `http://localhost:3002` (voir dossier `travel-booking-api`).
- Lancez l’app:
```bash
npm run android  # ou
npm run web
```

## Fonctionnalités
- Authentification: inscription (OTP), vérification OTP, connexion
- Accueil connecté avec moteur de recherche
- Résultats et réservation via API

## Stack
- Expo + React Native + TypeScript
- React Navigation (native-stack)
- Context API (état session en mémoire)
- Axios
- Tailwind (NativeWind)

## Configuration UI
- NativeWind configuré via `babel.config.js` (plugins) et `tailwind.config.js`

## Endpoints utilisés
- POST `POST /register`
- POST `POST /verify-otp`
- POST `POST /login`
- GET `/trips/search`
- POST `/trips/reserve` (Authorization: Bearer <token>)

## Remarques
- Pas de persistance locale (ni AsyncStorage) pour les données principales; la session existe uniquement en mémoire tant que l’app reste ouverte.

## Déploiement API et configuration de l’app
1) Déployer l’API (ex. Render):
   - dans `travel-booking-api`, `render.yaml` est prêt.
   - Pousser sur un repo Git, puis connecter sur Render et `New +` → `Blueprint`.
   - Une fois l’API en ligne (ex: `https://travel-booking-api.onrender.com`), notez l’URL.
2) Configurer l’app pour la production:
   - Utiliser l’env Expo:
     ```bash
     EXPO_PUBLIC_API_BASE_URL="https://travel-booking-api.onrender.com" npm run android
     # ou
     EXPO_PUBLIC_API_BASE_URL="https://travel-booking-api.onrender.com" npm run web
     ```
   - Ou modifier `app.json` → `extra.apiBaseUrl`.