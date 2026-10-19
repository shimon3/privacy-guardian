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

## Scan assisté (branche feature/assisted-discovery)
- Lance plusieurs recherches explicites sur Google/Bing dans un nouvel onglet.
- L'utilisateur colle volontairement des URL HTTPS de pages candidates.
- L'application nettoie et déduplique les URL, puis propose une vérification manuelle et un ajout au suivi.
- Les URL ne sont pas récupérées automatiquement depuis les moteurs et leur contenu n'est pas analysé.
- L'interface offre un accès direct à https://haveibeenpwned.com/ pour vérifier les fuites connues. Aucun email n'est envoyé par Privacy Guardian à HIBP.
- Pour l'API des recherches HIBP par email, une clé et une authentification serveur sont nécessaires ; ne jamais intégrer une clé côté navigateur.
- Attention : recherche Google/Bing et ouverture des URL candidates communiquent la requête ou l'URL aux services externes.
- La branche ne sera pas publiée automatiquement en production sans fusion dans main.

## Relances locales (branche feature/removal-followups)
- Section qui permet de fixer une date d'envoi et une échéance de relance sur les fiches enregistrées.
- Suggestion de relance à 30 jours à titre indicatif, **sans constituer un délai légal applicable**.
- Les rappels sont visibles uniquement quand le site est ouvert ; aucun email ni notification n'est envoyé.
- Les dates sont conservées dans la clé locale `privacy-guardian-followups-v1`. Les exports JSON v2 incluent les dates. Les exports v1 restent importables ; dans ce cas les anciennes échéances sont vidées pour éviter d'afficher des dates sans correspondance.
- Aucun service externe ni backend ajouté.
