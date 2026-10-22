# Higo × Brand — faut-il une peau « agence design » ?

> **Statut :** cadrage (2026-10-22) · pas d’incrément `sync-brand` sur Higo tant que le rôle reste « thème de base ».

## Réponse courte

| Question | Recommandation |
| --- | --- |
| Higo entre-t-il dans **Brand** comme Minigo ? | **Partiellement, plus tard** — pas un clone Minigo (`params.lowdit.view`). |
| Peau **agence design** (polices, couleurs, marges) ? | **Oui, en option** : couche `assets/css/higo-agence.css` ou params `higo.skin = "agence"` alimentée par **tokens Brand** (copie légère, pas tout `lowdit-system`). |
| `<select>` et formulaires | **Dans Higo** — composant SCSS `_forms.scss` + `appearance: base-select` avec repli ; pas besoin d’attendre Brand si le thème reste autonome. |
| Multilingue FR + contenu | **ExampleSite = FR par défaut** ; multilingue Hugo (`languages`) = **site consommateur** (comme BK), pas tout traduire dans l’exampleSite Liftoff. |

## Séparation des rôles (rappel)

- **Minigo + Brand** : catalogue, vues premium, `sync-brand.sh`.
- **Higo** : coque éditoriale Liftoff-like ; attractivité = **skin + contenu démo**, pas la planche complète Lowdit sur chaque page.

## Implémentation (2026-10-22)

Peau **`agence-lowdit`** dans le thème (`assets/scss/skin/_agence-lowdit.scss`) :

```toml
# config/_default/params.toml
higo_skin = "agence-lowdit"
higo_eyebrow = "Higo · Lowdit"   # optionnel
```

- Tokens : crème `#F7F6F2`, nuit `#0B2545`, turquoise `#14C6B1` (planche Brand, copie locale).
- Pas de `sync-brand.sh` : évolution manuelle du SCSS Higo.
- Démo Pages : `https://lowdit.github.io/higo/` (workflow `gh-pages.yml` après activation Pages sur le dépôt `higo`).
- Sites consommateurs (ex. BK) : ne pas activer `higo_skin` tant qu’ils gardent leur propre couche SCSS.

## Multilingue

- **Démo** : `defaultContentLanguage = fr` + i18n thème (`fr.yml` / `en.yml`) pour l’UI (menus shortcodes, nav-back).
- **Vrai bilingue** : structure `content/` + `content/en/` sur le site client ; hors scope exampleSite complet.
