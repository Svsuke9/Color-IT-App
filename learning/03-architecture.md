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

