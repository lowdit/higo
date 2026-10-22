# Higo — rôle et composition avec les autres modules

> Thème **site éditorial** Lowdit. Origine : [Hugo Liftoff](https://github.com/wjh18/hugo-liftoff) (`theme.toml` → `[original]`).

## Objectif

Publier et faire naviguer entre **articles**, **ressources** et **projets** (blog / portfolio / veille), avec SEO, taxonomies, feeds et formulaires Netlify optionnels.

## Ce que Higo ne fait pas

| Besoin | Module |
| --- | --- |
| Catalogue documents, vues Brand, Pagefind | **Minigo** |
| PDF / rapport print | **Repogo** |
| Slides / deck | **Sligo** |
| CV / candidature | **Resugo** |
| Enquête + `targetrepo` | **Fromago** |
| Restitution audit | **Frago** |

## Stack type (site consommateur)

Exemple réel : `bertrandkeller.github.io`

```toml
theme = ["higo", "repogo", "resugo", "sligo", "hugo-admonitions"]
```

- **Higo** : coque, menus, posts, ressources, SEO.
- **Moteurs** : formats ou enrichissements activés page par page (print, CV, slides).
- **Site** : menus métier, corpus, `assets/scss` (overrides visuels).

## Extension

- Surcharges `layouts/` et `assets/` dans le **site**, pas dans Higo.
- Remonter dans Higo uniquement les partials **génériques** (ex. lien source, `nav-depth`, i18n).

Voir aussi : [`NOTE-AMELIORATION-HIGO-ET-EXAMPLESITE.md`](NOTE-AMELIORATION-HIGO-ET-EXAMPLESITE.md).
