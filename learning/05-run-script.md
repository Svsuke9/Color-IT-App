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

