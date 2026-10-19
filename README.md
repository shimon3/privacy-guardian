# Privacy Guardian

Tableau de bord statique en français pour suivre les expositions de données personnelles et préparer des demandes d'effacement.

## Déploiement Cloudflare Pages
- Framework : None
- Build command : laisser vide
- Output directory : `site`
- Branch : `main`

Le site sauvegarde les informations dans le localStorage du navigateur, pas dans GitHub ni dans Cloudflare. Aucune recherche automatisée ni suppression automatique n'est actuellement fournie. Les emails doivent être envoyés manuellement. Ne publiez pas de sauvegardes JSON contenant des données personnelles dans ce dépôt.

Ouvrir `site/index.html` pour tester localement.

## Sécurité
Application sans backend, sans API tierce et sans script distant. Les informations locales ne sont pas chiffrées et peuvent être effacées par le navigateur.
