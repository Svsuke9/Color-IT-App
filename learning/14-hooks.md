# Hooks — useAuth et usePalettes

Ce document explique comment utiliser les hooks `useAuth` et `usePalettes` ajoutés dans `src/hooks/`.

1) useAuth
- Fichier : `src/hooks/useAuth.ts`
- Usage :

```tsx
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading, signOut } = useAuth()
  if (loading) return <div>Chargement...</div>
  if (!user) return <div>Pas connecté</div>
  return (
    <div>
      <p>Bonjour {user.email}</p>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}
```

2) usePalettes
- Fichier : `src/hooks/usePalettes.ts`
- Usage :

```tsx
import { usePalettes } from './hooks/usePalettes'

function MyPalettes({ userId }: { userId: string }) {
  const { palettes, loading } = usePalettes(userId)
  if (loading) return <div>Chargement...</div>
  return (
    <div>
      {palettes.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  )
}
```

3) PalettesList
- Fichier : `src/components/PalettesList.tsx`
- Utilisation : passer `palettes` en prop (voir usePalettes pour récupérer les palettes).

Prochaine étape
- Tester localement : `npm run dev` puis intégrer `useAuth`/`usePalettes` dans `src/App.tsx`.
