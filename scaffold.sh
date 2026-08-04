#!/usr/bin/env bash
set -e

BRANCH="feature/scaffold"
PR_TITLE="feat: scaffold initial + docs learning"
PR_BODY="Scaffold initial (React+TS+Vite), docs pédagogiques dans /learning, templates et CI basique."

# S'assurer d'être sur la branche
git fetch origin
if git rev-parse --verify $BRANCH >/dev/null 2>&1; then
  git checkout $BRANCH
else
  git checkout -b $BRANCH
fi

# Créer structure et fichiers (exemples)
mkdir -p src .github/ISSUE_TEMPLATE learning

cat > package.json <<'JSON'
{
  "name": "color-it-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.0.0"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "firebase": "^10.0.0"
  }
}
JSON

cat > index.html <<'HTML'
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Color-IT App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

cat > src/main.tsx <<'TS'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
TS

cat > src/App.tsx <<'TSX'
import React from 'react'

export default function App() {
  return (
    <div style={{padding:20}}>
      <h1>Color-IT App</h1>
      <p>Bienvenue — scaffolding initial. Voir le dossier learning/ pour la documentation pédagogique.</p>
    </div>
  )
}
TSX

cat > src/styles.css <<'CSS'
body { font-family: Arial, sans-serif; }
CSS

cat > learning/01-intro.md <<'MD'
# Introduction — Cahier des charges et résumé

Ce fichier résume les objectifs généraux du projet Color-IT et sert d'entrée pédagogique.

IMPORTANT : le cahier des charges source est disponible ici :
https://github.com/Svsuke9/Color-IT-App/blob/main/Cahier%20des%20Charges%20Color%20IT%20%20(1).pdf

Résumé rapide (MVP proposé)

- Objectif : créer une application permettant de gérer, visualiser et partager des palettes de couleurs, avec fonctionnalités d'authentification, sauvegarde, recherche et partage.
- Utilisateurs cibles : designers, développeurs front-end, personnes cherchant des palettes de couleurs.
- Fonctionnalités MVP :
  1. Authentification (inscription / connexion)
  2. Créer / éditer / supprimer une palette
  3. Sauvegarde des palettes pour chaque utilisateur (Firestore)
  4. Visualisation / affiche palette (aperçu, codes hex)
  5. Partage (lien public)
- Contraintes / priorités : simplicité, responsive, performance sur mobile, pas de secrets committés.

Ce fichier sera complété au fur et à mesure après extraction complète du PDF.
MD

cat > learning/02-setup.md <<'MD'
# Setup — Environnement de développement

Suivez ces étapes pour configurer votre environnement local.

Prérequis
- Node.js 18+ (ou version LTS recommandée)
- npm ou yarn
- Un éditeur (VS Code recommandé)
- Compte GitHub et accès au dépôt
- (Optionnel) Firebase CLI pour connecter le projet à Firebase

Installation locale

1. Cloner le dépôt :
   git clone https://github.com/Svsuke9/Color-IT-App.git
   git checkout feature/scaffold

2. Installer les dépendances :
   cd Color-IT-App
   npm install

3. Variables d'environnement (exemple)
- Créez un fichier `.env.local` (ne pas committer) et ajoutez les clés Firebase :

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id

4. Démarrer le projet :
   npm run dev

Tests
- npm run test (si ajout de tests)

Debug / Lint
- npm run lint
- npm run format

MD

cat > learning/03-architecture.md <<'MD'
# Architecture proposée

Stack choisie pour le MVP (par défaut)
- Frontend : React + TypeScript + Vite (SPA)
- Backend / persistance : Firebase Authentication + Firestore (serverless)
- CI/CD : GitHub Actions (build + lint)

Structure du repo
- /src
  - /components
  - /pages
  - /services (ex : firebase.ts)
  - /styles
- /public
- /learning (documentation pédagogique)

Flux de données
- Firestore pour stocker les palettes : collection `palettes` documents { ownerId, name, colors[], createdAt }
- Auth via Firebase Auth (email/password / providers)

Sécurité
- Pas de clés dans le repo : utiliser des variables d'environnement et GitHub Secrets
- Rules Firestore : accès en lecture publique pour palettes partagées, accès restreint en écriture au propriétaire

Extensibilité
- Remplacer Firestore par Supabase/Postgres plus tard si besoin
- Ajouter une API Node si logique serveur devient complexe

MD

cat > learning/04-learning-plan.md <<'MD'
# Plan d'apprentissage

Objectif : apprendre en construisant. Voici le programme pédagogique suivi pendant le développement.

Semaine 1 — Fondamentaux et setup
- Installer l'environnement
- Comprendre la structure React + TypeScript
- Déployer un premier commit sur `feature/scaffold`

Semaine 2 — Auth & persistance
- Intégrer Firebase Auth (email)
- Créer la collection Firestore `palettes`
- Construire les services d'accès aux données

Semaine 3 — UI & UX
- Écrans : Auth, Liste de palettes, Détail palette, Création/édition
- Responsive design et accessibilité de base

Semaine 4 — Partage et déploiement
- Partage via lien public
- CI/CD : build et déploy (ex: Firebase Hosting ou Vercel)

À chaque étape : rédaction d'un article dans `learning/` expliquant quoi faire, pourquoi et comment (avec commandes et extraits de code).

MD

cat > learning/05-run-script.md <<'MD'
# Exécution du script scaffold.sh — guide pas à pas

Objectif : Le script scaffold.sh crée le scaffold initial (fichiers frontend, .gitignore, CI, learning/) puis pousse la branche feature/scaffold et ouvre la PR/les issues si les outils CLI sont installés.

Prérequis locaux :
- Git installé et configuré (git config user.name / user.email)
- Avoir cloné le repo et être sur la branche feature/scaffold
- (Optionnel) L’outil en ligne de commande GitHub (gh) connecté

Étapes pour exécuter :
1. Placer scaffold.sh à la racine (branche feature/scaffold).
2. Rendre exécutable : chmod +x scaffold.sh
3. Lancer : ./scaffold.sh
4. Vérifier : git log --oneline -n 3 ; git status ; vérifier la présence des fichiers créés (ls -la)
5. Ouvrir le repo → onglet Pull requests → vérifier que la PR a été créée (ou la créer manuellement si nécessaire).

Résultats attendus :
- Nouveaux fichiers ajoutés : package.json, index.html, src/*, .github/workflows/ci.yml, learning/*
- Commit et push sur feature/scaffold
- PR créée (si gh est présent)
- Issues créées (si gh est présent)

Sécurité :
- Ne pas committer de secrets. firebase.example.env est un exemple — créez .env.local localement.
- Si vous avez donné des accès temporaires, pensez à les révoquer après.

Nettoyage :
- Si vous voulez annuler : git checkout main && git branch -D feature/scaffold && git push origin --delete feature/scaffold

MD

cat > firebase.example.env <<'ENV'
# NE PAS COMMITTER VOS CLÉS RÉELLES
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
ENV

cat > .gitignore <<'GIT'
node_modules
/.env
/.env.local
/dist
/.firebase
.vscode/
.DS_Store
GIT

cat > README.md <<'MD'
# Color-IT-App

Projet Color-IT - branch feature/scaffold

Voir le dossier learning/ pour la documentation pédagogique et le cahier des charges original (PDF).
MD

cat > LICENSE <<'TEXT'
MIT License

Copyright (c) 2026 Svsuke9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full MIT text omitted for brevity in this commit — will add full license in main branch]
TEXT

cat > .github/workflows/ci.yml <<'YML'
name: CI

on:
  push:
    branches: [ main, feature/scaffold ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
YML

cat > .github/PULL_REQUEST_TEMPLATE.md <<'MD'
<!-- Pull request template -->

## Description

Merci d'expliquer brièvement ce que contient cette PR.

## Checklist
- [ ] J'ai testé localement
- [ ] J'ai ajouté/ mis à jour la documentation dans /learning

MD

cat > .github/ISSUE_TEMPLATE/bug_report.md <<'MD'
---
name: Bug report
about: Signaler un bug
---

**Décrivez le bug**

**Étapes pour reproduire**

1. 
2.

**Comportement attendu**

**Environnement**
- OS: 
- Browser: 

MD

cat > .github/ISSUE_TEMPLATE/feature_request.md <<'MD'
---
name: Feature request
about: Demander une nouvelle fonctionnalité
---

**Description**

**Pourquoi c'est utile**

**Critères d'acceptation**

- 

MD

