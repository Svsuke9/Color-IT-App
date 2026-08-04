# Firebase Authentication — Semaine 2, Étape A

## Objectif

Intégrer **Firebase Authentication** pour permettre aux utilisateurs de s'inscrire et se connecter à l'app Color-IT.

## Ce qu'on a créé

### 1. `src/services/firebase.ts` — Configuration Firebase

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

**Pourquoi ?** Firebase SDK a besoin de votre config pour initialiser l'app et l'accès aux services (Auth + Firestore).

---

### 2. `src/services/authService.ts` — Services d'authentification

Expose 4 fonctions principales :

#### **signUp(email, password, displayName?)**
Crée un nouvel utilisateur avec email/password.

```typescript
const user = await signUp('user@example.com', 'password123', 'John Doe')
// user.uid → ID unique Firebase
// user.email → Email de l'utilisateur
```

#### **login(email, password)**
Connecte un utilisateur existant.

```typescript
const user = await login('user@example.com', 'password123')
```

#### **logout()**
Déconnecte l'utilisateur courant.

```typescript
await logout()
// L'utilisateur est supprimé du state Firebase
```

#### **getCurrentUser()**
Récupère l'utilisateur actuellement connecté.

```typescript
const user = getCurrentUser()
if (user) {
  console.log(user.uid, user.email)
}
```

**Gestion d'erreurs :** Chaque fonction fait un try/catch et jette l'erreur pour que le composant UI puisse la traiter.

---

### 3. `src/services/paletteService.ts` — CRUD Firestore

Opérations sur la collection `palettes` dans Firestore :

#### **listPalettesForUser(userId)**
Récupère toutes les palettes d'un utilisateur.

```typescript
const palettes = await listPalettesForUser(user.uid)
// Retourne: [{ id: '...', name: '...', colors: [...], ... }]
```

**Query Firestore :**
```
collection: 'palettes'
where: ownerId == userId
```

#### **createPalette(palette)**
Crée une nouvelle palette avec un timestamp.

```typescript
const paletteId = await createPalette({
  name: 'Summer Vibes',
  colors: [
    { hex: '#FF6B6B', name: 'Red' },
    { hex: '#4ECDC4', name: 'Teal' },
  ],
  ownerId: user.uid,
  isPublic: false,
})
// Retourne: 'abc123def456' (ID du document Firestore)
```

#### **updatePalette(paletteId, updates)**
Modifie une palette existante.

```typescript
await updatePalette('abc123def456', {
  name: 'Summer Vibes Updated',
  isPublic: true,
})
```

#### **deletePalette(paletteId)**
Supprime une palette.

```typescript
await deletePalette('abc123def456')
```

---

### 4. `src/models/palette.ts` — Types TypeScript

Définit la structure d'une palette (et d'une couleur) :

```typescript
export interface Color {
  hex: string
  name?: string
}

export interface Palette {
  id: string
  name: string
  description?: string
  colors: Color[]
  ownerId: string
  isPublic: boolean
  createdAt: Timestamp | Date
  updatedAt?: Timestamp | Date
}
```

**Utilisé par :** `paletteService.ts` et `usePalettes.ts` pour la typage.

---

### 5. `src/hooks/useAuth.ts` — Hook React

Gère l'état d'authentification :

```typescript
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // S'abonne aux changements d'auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  async function signOut() {
    await firebaseSignOut(auth)
  }

  return { user, loading, signOut }
}
```

**Utilisation dans un composant :**
```typescript
function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not logged in</div>
  
  return (
    <div>
      <p>Bienvenue, {user.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
```

---

## Architecture globale

```
User → LoginPage
       ↓ (signUp/login)
       ↓
authService.ts (Firebase Auth SDK)
       ↓
Firebase Auth (serveur)
       ↓ (on auth state change)
useAuth hook (state management)
       ↓
Composants UI (affichent user)
```

---

## Prochaines étapes

1. **Setup Firebase Console** — Créer un projet Firebase et configurer Auth + Firestore
2. **Créer LoginPage & SignupPage** — Formulaires d'authentification
3. **Améliorer useAuth** — Ajouter sign up/login directement dans le hook
4. **Firestore Rules** — Sécuriser l'accès aux données

---

## Fichiers touchés

- ✅ `src/services/firebase.ts`
- ✅ `src/services/authService.ts` (NEW)
- ✅ `src/services/paletteService.ts` (NEW)
- ✅ `src/models/palette.ts` (NEW)
- ✅ `src/hooks/useAuth.ts`

**Branche :** `feature/scaffold`
**Commits :** 3 nouveaux commits
