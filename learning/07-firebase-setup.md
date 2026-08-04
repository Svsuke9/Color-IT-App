# Firebase Console Setup — Semaine 2, Étape B

## Objectif

Créer un projet Firebase et configurer :
- ✅ Firebase Authentication (Email/Password)
- ✅ Firestore Database
- ✅ Firestore Security Rules

---

## Étape 1 : Créer un projet Firebase

### 1.1 Aller sur Firebase Console

Accédez à [console.firebase.google.com](https://console.firebase.google.com)

### 1.2 Cliquer sur "Add project"

![Add Project](https://firebase.google.com/docs/images/console-overview.png)

### 1.3 Remplir les infos

```
Project name: Color-IT-App
Enable Google Analytics: ✓ (optionnel)
Google Analytics account: Créer un nouveau compte
```

### 1.4 Attendre la création

C'est gratuit avec Firebase's Spark plan (jusqu'à certaines limites).

---

## Étape 2 : Activer Firebase Authentication

### 2.1 Aller dans "Authentication"

Dans la sidebar gauche → **Build** → **Authentication**

### 2.2 Cliquer sur "Get Started"

### 2.3 Sélectionner "Email/Password"

- Cliquer sur "Email/Password"
- Toggle **Enable**
- Laisser "Password Authentication" activé
- **Disable** "Email link sign-in" (on veut juste email + password)
- Cliquer **Save**

### 2.4 Résultat

Vous verrez : "Email/Password" est maintenant activé ✅

---

## Étape 3 : Créer Firestore Database

### 3.1 Aller dans "Firestore Database"

Dans la sidebar gauche → **Build** → **Firestore Database**

### 3.2 Cliquer "Create database"

### 3.3 Configurer

```
Location: Europe (belgique) ou votre région
Mode: Start in production mode ← IMPORTANT!
```

**Pourquoi production mode ?** Vous allez écrire vos propres règles (et pas dans test mode qui est permissif).

### 3.4 Attendre

Firestore se crée en quelques secondes.

---

## Étape 4 : Firestore Security Rules

### 4.1 Aller dans l'onglet "Rules"

En haut de la page Firestore Database.

### 4.2 Remplacer les règles par ceci

```firestore-rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Authentification requise
    match /palettes/{document=**} {
      // L'utilisateur peut lire/écrire ses propres palettes
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
      
      // L'utilisateur peut créer une palette (le ownerId sera son uid)
      allow create: if request.auth != null && request.resource.data.ownerId == request.auth.uid;
      
      // Palettes publiques : lecture pour tout le monde
      allow read: if resource.data.isPublic == true;
    }
  }
}
```

### 4.3 Cliquer "Publish"

Les règles sont maintenant actives.

---

## Étape 5 : Récupérer les clés Firebase

### 5.1 Aller dans "Project Settings"

En bas à gauche, cliquer sur l'icône engrenage → **Project Settings**

### 5.2 Aller dans l'onglet "General"

### 5.3 Scroller jusqu'à "Your apps"

Chercher votre app (il y en a peut-être déjà une par défaut).

### 5.4 Copier la config

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "color-it-app-12345.firebaseapp.com",
  projectId: "color-it-app-12345",
  storageBucket: "color-it-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};
```

### 5.5 Créer `.env.local` (NE PAS COMMITTER)

À la racine du projet :

```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=color-it-app-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=color-it-app-12345
VITE_FIREBASE_STORAGE_BUCKET=color-it-app-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

**⚠️ IMPORTANT :** `.env.local` est dans `.gitignore` — vos clés NE seront PAS committées.

---

## Étape 6 : Test

### 6.1 Redémarrer le serveur local

```bash
npm run dev
```

### 6.2 Tester la connexion

Allez dans la console du navigateur (F12 → Console) et testez :

```javascript
import { signUp, login } from './services/authService'

// Inscription
const user = await signUp('test@example.com', 'password123', 'Test User')
console.log('User créé:', user.uid)

// Login
const loggedIn = await login('test@example.com', 'password123')
console.log('Connecté:', loggedIn.email)
```

### 6.3 Vérifier dans Firebase Console

Allez dans **Authentication** → **Users** et vous devriez voir votre utilisateur créé ! ✅

---

## Récap

| Étape | Service | Action |
|-------|---------|--------|
| 1 | Firebase Console | Créer projet |
| 2 | Authentication | Activer Email/Password |
| 3 | Firestore | Créer database (production mode) |
| 4 | Firestore Rules | Écrire règles de sécurité |
| 5 | Settings | Récupérer clés API |
| 6 | `.env.local` | Ajouter les clés (ne pas committer) |

---

## Prochaine étape

Créer les pages UI (`LoginPage.tsx`, `SignupPage.tsx`) pour utiliser ces services ! 🎨
