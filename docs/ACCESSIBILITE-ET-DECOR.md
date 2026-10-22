# Accessibilité et décor (Higo)

## Contrôles recommandés

- Contraste texte / fond : peau `agence-lowdit` (nuit `#0B2545` sur crème `#F7F6F2`, turquoise `#14C6B1` pour liens et focus).
- Focus visible : `components/_a11y.scss` (`:focus-visible` sur liens, boutons, champs).
- Colonne de lecture : **75ch** (`$prose-measure`, `components/_measure.scss`).
- Coquille `.container` : **73.75em** (Liftoff, listes/accueil) — distincte de la prose. Articles : `--higo-post-layout-max` = 75ch + aside (~19rem).
- Tableaux : en-têtes contrastés (`components/_tables.scss` + variables `--color-table-head-*`).

Revue manuelle : accueil, article, `/tags/`, `/contact/`, mode sombre si activé.

## css-doodle

**Hors scope Higo par défaut.** Utilisé ailleurs (ex. galeries Repogo) pour des **motifs décoratifs** non essentiels — avec `prefers-reduced-motion` et sans information dans le motif seul (cf. Brand / CSS-VUES-ET-GALERIE).

Pour Higo éditorial : préférer typographie, aplats et images de contenu ; css-doodle seulement si un site consommateur l’ajoute en `custom_css`, pas dans le thème de base.
