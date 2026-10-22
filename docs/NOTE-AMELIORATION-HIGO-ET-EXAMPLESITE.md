# Note améliorative — Higo (thème + exampleSite)

> **Statut :** en cours (2026-10-22) — lots A/B partiellement livrés (exampleSite FR, nav-back, posts/source, docs).  
> **Contexte :** stabiliser la gamme Lowdit ; Higo reste un fork de [Hugo Liftoff](https://github.com/wjh18/hugo-liftoff) (`theme.toml` → `[original]`) ; le blog **bertrandkeller.github.io** est le consommateur le plus exigeant.  
> **Liens :** [`lowdit-site/docs/PLAN-GAMME-PRODUIT.md`](../../lowdit-site/docs/PLAN-GAMME-PRODUIT.md) · [`bertrandkeller.github.io/docs/INTENTION-CERVEAU-EDITORIAL-ET-RESOURCES.md`](../../bertrandkeller.github.io/docs/INTENTION-CERVEAU-EDITORIAL-ET-RESOURCES.md) · [`lowtech-dev-method/docs/COUCHES-SEPARATION-UNIVERS.md`](../../lowtech-dev-method/docs/COUCHES-SEPARATION-UNIVERS.md).

---

## 1. Rôle de Higo dans la gamme (éviter le recouvrement)

| Module | Objectif | Ce qu’il **fait** | Ce qu’il **ne fait pas** |
| --- | --- | --- | --- |
| **Minigo** | Coque catalogue / portail documentaire | Sections, cartes, vues Brand (`thinktank`, `publisher`…), Pagefind | Blog daté, portfolio perso, SEO « personal brand » Liftoff |
| **Higo** | **Site éditorial** articles + ressources + projets | Navigation profonde, taxonomies, feeds, SEO, dark mode, formulaires Netlify | Catalogue produit Minigo, PDF Repogo, decks Sligo, CV Resugo, enquêtes Fromago |
| **Repogo** | Print / rapport | Moteur Paged.js, sorties document | Shell du site, menu principal |
| **Sligo** | Présentation / formation | Deck Reveal, module Publications (gelé) | Articles de blog longs |
| **Resugo** | CV / candidature | Vue `cv-vitrine`, export ATS (proposé) | Site complet multi-sections |
| **Fromago** | Enquête / formulaires | `targetrepo`, workflow réponses | CMS général |
| **Frago** | Restitution audit | Indicateurs, exports Observer/kit | Blog |

**Règle de composition (déjà en prod sur le blog BK) :**

```toml
theme = ["higo", "repogo", "resugo", "sligo", "hugo-admonitions"]
```

- **Higo** = coque éditoriale + layouts « site ».
- **Moteurs** = formats de sortie ou enrichissements **sur demande** (print, CV, slides, admonitions).
- **Ne pas** dupliquer dans Higo ce que Minigo ou Repogo font déjà (cartes catalogue, pipeline PDF).

**Minigo vs Higo (vitrine Lowdit) :** Minigo = *organiser et faire découvrir des documents* ; Higo = *faire vivre un fil éditorial* (articles, ressources, projets). Les deux peuvent coexister sur un grand site (BK empile Higo + moteurs ; pas Minigo aujourd’hui — choix assumé : blog éditorial, pas portail catalogue).

---

## 2. Comparaison Higo exampleSite ↔ blog Bertrand Keller

| Dimension | `higo/exampleSite` (Liftoff) | `bertrandkeller.github.io` |
| --- | --- | --- |
| **Langue / public** | EN, « John Doe », démo portfolio générique | FR, auteur, menus métier (Articles, Analyses, Ressources, Expertises) |
| **Contenu** | Posts fictifs, projets placeholder, peu de lien ressource ↔ article | Corpus réel, ressources accessibilité, papers, veille, CV (Resugo), decks (Sligo) |
| **Thèmes empilés** | Higo seul | Higo + Repogo + Resugo + Sligo + admonitions |
| **Layouts site** | Templates thème par défaut | Surcharges `layouts/posts/single.html` (avatar, `media_url`, lien source/traduction, `print/links`) |
| **Styles** | SCSS thème Liftoff | `assets/scss/main.scss` site : `.nav-back`, `.block-moto`, listes, gradients — **non portés dans Higo** |
| **Config Hugo** | Liftoff (paginate legacy, minify tdewolff, outputs Netlify REDIRECTS/HEADERS) | Hugo ≥ 0.167, `ignoreLogs` raw HTML, feeds ATOM/JSON, permalinks posts datés, `related` sur catégories |
| **SEO / auteur** | `[author].name` (corrigé récemment) | `[params.author]` + avatar statique site |
| **Nav retour** | Partial `utils/nav-depth` présent | Même partial + **CSS positionnement** `.nav-back` dans le site |

**Constat :** le blog n’est pas « un autre thème » — c’est **Higo + personnalisations site + moteurs**. Une partie des « améliorations blog » (nav-back visible, en-têtes posts riches) est **dans le dépôt site**, pas remontée dans Higo → l’exampleSite paraît cassé ou pauvre alors que le produit réel est ailleurs.

---

## 3. Problèmes connus — exampleSite (affichage & contenu)

### 3.1 Technique (build / Hugo 0.167)

| Problème | Gravité | Piste |
| --- | --- | --- |
| Thème introuvable (`themes/higo`) | Bloquant | Symlink `exampleSite/themes/higo` → `../..` + `go.mod` `replace` (aligné Minigo) |
| Clés `minify.tdewolff.*` supprimées | Bloquant | `keepSpecialComments`, `css.version` (fait localement ; à figer en dépôt) |
| `imaging.quality` / `hint` dépréciés | WARN | `imaging.jpeg.quality`, `imaging.webp.*` |
| `paginate` global | WARN futur | Migrer vers `[pagination]` (comme BK) |
| Outputs `REDIRECTS` / `HEADERS` sans layout | WARN | Layouts home Netlify ou retirer outputs de la démo minimale |
| HTML brut dans projets démo | WARN contenu | `unsafe = true` **ou** retirer HTML des MD démo **ou** `ignoreLogs` (BK choisit ignoreLogs) |

### 3.2 Affichage (UX Liftoff non stylée côté thème)

| Problème | Cause probable | Piste Higo |
| --- | --- | --- |
| Lien « retour » (`nav-depth`) peu visible / chevauchement | Partial sans styles `.nav-back` dans `assets/scss` | Porter une variante **sobre par défaut** dans le thème ; le site BK garde override avancé |
| Contenu projets tronqué (HTML omis) | Goldmark `unsafe = false` | Documenter ; démo sans raw HTML ou activer unsafe dans exampleSite seulement |
| Double taxonomies / tags en en-tête vs aside | Divergence layout `posts/single` BK vs thème | Choisir **un** gabarit canon dans Higo ; BK surcharge si besoin métier |
| Texte 100 % EN (series, footer Liftoff) | Contenu upstream | exampleSite **FR light** ou bilingue minimal + footer Higo/Liftoff |
| Pas de parcours « article → ressource » | Contenu déconnecté | 1 fil démo : 1 post → 1 page ressource → 1 projet (objectif PLAN-GAMME produit Higo) |

### 3.3 Contenu & crédibilité démo

- Garder les **features Liftoff** (series, subsections, TOC, related) mais avec **2–3 contenus français** qui racontent Lowdit, pas « John Doe ».
- **Ne pas** copier le corpus BK dans exampleSite (volume, droits, maintenance) — **synthétiser** les patterns (post avec source, catégories, nav-back).
- Référence Liftoff : footer, wiki, liens GitHub upstream — **conserver** l’attribution.

---

## 4. Fonctionnalités « blog BK » — où les mettre ?

| Fonctionnalité | Remonter dans **Higo** ? | Rester **site BK** ? | Autre module ? |
| --- | --- | --- | --- |
| `nav-depth` / nav-back | **Oui** — styles de base + doc | Override position (SCSS site) | — |
| En-tête post (`image`, titre long) | **Oui** — option params | Avatar perso, chemins `/assets/…` | — |
| Lien source / traduction (`link`, `source`, `traduction`) | **Oui** — partial i18n FR/EN | — | — |
| `partial print/links` sur listes | **Oui** — déjà dans Higo ; tester avec Repogo dans exampleSite | — | **Repogo** |
| Feeds ATOM/JSON/FEED | **Oui** — layouts existent ; exampleSite doit les activer | Config outputs BK | — |
| Bloc auteur + avatar | Optionnel (params `author.avatar`) | Image BK fixe OK | — |
| Menus Analyses / Ressources / Expertises | Non | **Oui** — arborescence éditoriale | — |
| Stacks Sligo/Resugo sur une page | Non | **Oui** | **Sligo / Resugo** |
| Admonitions | Non | Consomme module tiers | hugo-admonitions |
| Lowdit Brand / tokens Minigo | **Non** — hors scope Higo | BK n’utilise pas Minigo aujourd’hui | **Minigo + sync-brand** |

**Principe :** tout ce qui est **réutilisable par tout site Higo** remonte dans le thème ; tout ce qui est **identité ou corpus BK** reste dans bertrandkeller.github.io.

---

## 5. Plan de stabilisation proposé (par lots)

### Lot A — « exampleSite honnête » (priorité vitrine interne)

1. Tooling : symlink thème + `go.mod` + `config/production` module GitHub.
2. Config Hugo 0.167 sans ERROR/WARN bloquants (pagination, minify, imaging).
3. Contenu démo FR court : accueil, 1 post, 1 ressource liée, 1 projet, menus cohérents.
4. Checklist visuelle : nav-back, TOC, related, dark mode, mobile menu, 404.
5. Doc `exampleSite/README.md` : `hugo serve`, environnements dev/prod, limites Liftoff.

**Fin de lot :** `hugo build` OK depuis `exampleSite` ; parcours démo = promesse PLAN-GAMME § Higo.

### Lot B — « rattrapage blog → thème »

1. Styles `.nav-back` + espacement `page-header` dans SCSS Higo (defaults accessibles).
2. Fusionner le meilleur de `bertrandkeller.github.io/layouts/posts/single.html` dans Higo **sans** casser BK (params feature flags : `showAuthorBox`, `showSourceLink`, …).
3. i18n FR pour chaînes encore EN (`back-to`, series, footer exampleSite).
4. Tests : build **BK** + build **exampleSite** après chaque changement.

### Lot C — « frontière modules » (doc + gouvernance)

1. `higo/docs/ROLE-ET-COMPOSITION.md` : stack recommandée avec Repogo/Sligo/Resugo (1 page).
2. Matrice « ne pas implémenter dans Higo » (catalogue Minigo, PDF, deck, formulaire Fromago).
3. Option : exampleSite **secondaire** minimal `theme = ["higo", "repogo"]` pour montrer les liens print (sans dupliquer Repogo docs).

**Hors scope immédiat :** sync Brand / Minigo sur Higo (décision produit séparée — Higo reste thème Liftoff-like, pas coque DS 2026).

---

## 6. Risques si on ne tranche pas

| Risque | Impact |
| --- | --- |
| Double maintenance Liftoff / BK layouts | Drift, bugs SEO (author, feeds) |
| exampleSite EN générique | Crédibilité gamme, `hs test` / serve-hugo groupes |
| Features catalogue recopiées dans Higo | Recouvrement Minigo, sync-brand ingérable |
| Tout porter dans BK | Nouveaux sites Higo (a11yNot, cours) repartent de zéro |

---

## 7. Proposition d’incrément NEXT (à approuver)

```yaml
id: P-higo-stabilisation-examplesite-01
statut: proposé
cible: cursor
depot: higo (+ smoke bertrandkeller.github.io)
objectif: >-
  Stabiliser exampleSite (tooling, Hugo 0.167, démo FR courte article→ressource→projet)
  et documenter la frontière Higo vs moteurs vs site BK.
fin:
  - exampleSite build/serve OK ; README ; NOTE présente (ce fichier) à jour si écarts.
  - Styles nav-back minimaux dans le thème ; partials posts alignés BK où génériques.
  - hugo build bertrandkeller.github.io OK (non-régression).
hors-perimetre:
  - Pages GitHub Higo ; migration corpus BK ; sync Minigo/Brand sur Higo.
```

---

## 8. Synthèse une phrase

**Higo** = thème éditorial Lowdit (héritier Liftoff) ; **exampleSite** doit montrer un fil FR crédible et un tooling moderne ; **bertrandkeller.github.io** prouve la stack multi-moteurs — il faut **remonter le générique** (nav-back, post enrichi, config Hugo récente) dans Higo et **laisser au site** l’arborescence, le corpus et les overrides visuels forts.
