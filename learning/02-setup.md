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

