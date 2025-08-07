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