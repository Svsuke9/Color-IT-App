# Exemples de code — snippets pratiques

Cette page rassemble des extraits de code prêts à l'emploi pour démarrer rapidement l'authentification Firebase, la structure d'un service d'accès aux palettes et des composants React/TypeScript de base. Copie-colle les snippets dans `src/` et adapte les chemins et noms d'environnement.

---

## 1) Exemple `firebase.ts` (initialisation)
```ts
// src/services/firebase.ts
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

export default app
```

---

## 2) Exemple d'auth (signup / signin) React + TS
```tsx
// src/components/AuthForm.tsx
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin'|'signup'>('signin')
  const [error, setError] = useState<string|null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>{mode === 'signup' ? 'S’inscrire' : 'Se connecter'}</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <button type="submit">{mode === 'signup' ? 'S’inscrire' : 'Se connecter'}</button>
      <button type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
        {mode === 'signup' ? 'J’ai déjà un compte' : 'Créer un compte'}
      </button>
    </form>
  )
}
```

---

## 3) Modèle `Palette` et service Firestore
```ts
// src/models/palette.ts
export type Color = { hex: string }
export type Palette = {
  id?: string
  ownerId: string
  name: string
  colors: Color[]
  createdAt?: string
}

// src/services/paletteService.ts
import { db } from './firebase'
import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'
import type { Palette } from '../models/palette'

const palettesCol = collection(db, 'palettes')

export async function createPalette(p: Omit<Palette,'id'|'createdAt'>) {
  const payload = { ...p, createdAt: Timestamp.now() }
  const ref = await addDoc(palettesCol, payload)
  return { id: ref.id, ...payload }
}

export async function updatePalette(id: string, data: Partial<Palette>) {
  const ref = doc(db, 'palettes', id)
  await setDoc(ref, data, { merge: true })
}

export async function deletePalette(id: string) {
  await deleteDoc(doc(db, 'palettes', id))
}

export async function listPalettesForUser(userId: string) {
  const q = query(palettesCol, where('ownerId','==', userId), orderBy('createdAt','desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Palette[]
}
```

---

## 4) Composant d'affichage simplifié
```tsx
// src/components/PaletteCard.tsx
import React from 'react'
import type { Palette } from '../models/palette'

export default function PaletteCard({ palette }: { palette: Palette }) {
  return (
    <div style={{border:'1px solid #eee', padding:12, borderRadius:6}}>
      <h4>{palette.name}</h4>
      <div style={{display:'flex', gap:8}}>
        {palette.colors.map((c,i) => (
          <div key={i} style={{width:48, height:48, background:c.hex, borderRadius:4}} title={c.hex}></div>
        ))}
      </div>
    </div>
  )
}
```

---

## 5) Conseils et bonnes pratiques
- Ne commite jamais des clés d'API : utilise `.env.local` et `firebase.example.env` comme modèle.
- Teste `npm run build` localement avant de pusher pour éviter des échecs CI.
- Ajoute des règles Firestore simples pour protéger l'écriture (ex: only owner can write to their palettes).

---

Souhaites-tu que je :
- 1) crée ces fichiers dans `src/` sur la branche `feature/scaffold` (je peux les ajouter directement),
- 2) les laisse uniquement dans `learning/` pour que tu les copies manuellement, ou
- 3) crée aussi des tests de base et des storybook stories pour les composants ?

Réponds "1", "2" ou "3" selon ton choix et j'exécute la suite en mettant à jour learning/ et le repo.
