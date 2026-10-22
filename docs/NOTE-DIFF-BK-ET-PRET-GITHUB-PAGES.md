# Note — Diff Higo / bertrandkeller.github.io & préparation GitHub Pages

> **Date :** 2026-10-22  
> **Statut :** note de modification (aucun commit effectué sur demande).  
> **Contexte :** vague UX/a11y exampleSite + remontée générique dans le thème ; comparaison avec le consommateur **bertrandkeller.github.io** (BK).

---

## 1. Synthèse

Le thème **Higo** couvre désormais une large part de ce que BK dupliquait en SCSS/layouts (nav-back de base, `header-split`, grille article + aside, `media_url`, mesure ~75ch, tableaux Markdown, termes + compteurs, nav-transverse, contact, peau `agence-lowdit`).  

**BK peut alléger** quelques surcharges après montée de version Higo, **sans** toucher au métier (moto, sections landing, avatar auteur, position absolue du retour parent, numérotation Repogo).

**GitHub Pages :** le build prod **exampleSite** (67 pages FR) passe en local avec `HUGO_SITE_DIR=exampleSite`, mais **le workflow CI actuel risque de builder la mauvaise racine** (~13 pages) tant qu’un pointeur explicite `exampleSite` n’est pas ajouté au script/workflow (voir §4).

---

## 2. Matrice Higo ↔ BK

| Sujet | Higo (état local non commité) | BK (`assets/scss/main.scss`, layouts) | Simplifier BK ? |
| --- | --- | --- | --- |
| **Retour parent** | `layouts/_partials/utils/nav-depth.html` + `container--post` posts/projets ; `_nav-back.scss` (flux, padding) | `.nav-back { position:absolute; top:-4em; … }` — chevauchement hero voulu | **Non** — garder le positionnement BK ; retirer seulement si le site accepte le flux thème |
| **`header-split`** | `_page-header.scss` : mobile titre puis image ; desktop **titre \| image** ; image visible mobile | L295–348 : desktop **image \| titre** ; image `display:none` &lt; 60em ; hachure `::after` | **Partiel** — supprimer le bloc SCSS BK **seulement** si le flip gauche/droite et la hachure sont acceptés ou re-portés en 10 lignes site |
| **`posts/single.html`** | `container--post`, image en-tête sans doublon corps, `media_url`, classe `markdown`, i18n séries | Override quasi identique + **bloc avatar** (`single-avatar-block`) + `<article>` sans `.markdown` | **Partiel** — retirer le bloc `media_url` du layout BK (déjà dans Higo) ; **garder** avatar / `share_link` / textes FR hardcodés tant que non paramétrés dans le thème |
| **Grille TOC / aside** | `_single.scss` : colonne prose 75ch + sidebar (TOC + aside, sans sticky) | Pas de SCSS dédié ; héritait Liftoff + overrides header | **Oui** — pas de surcharge BK à maintenir pour la grille |
| **Taxonomies `term-count`** | `layouts/_default/terms.html` + `_terms.scss` | `terms.html` **identique** au thème | **Oui** — **supprimer** `bertrandkeller.github.io/layouts/_default/terms.html` après bump Higo |
| **Nav transverse projets** | `projects/single.html` sans « Menu : », styles `_nav-transverse.scss` | BK n’override pas ce layout | — |
| **TOC numéroté** | `#TableOfContents ul` → `list-style: decimal` | Pas d’équivalent ; autre sujet : `.toc__menu` + `section[autonumbering]` dans `list.html` / `_default/single.html` (Repogo) | **Non** — logique **Repogo / print**, hors Higo |
| **Typo / liens animés** | — | `.moto`, `.block-moto`, `h1 a` / `.post a` background gradient | **Non** — identité BK |
| **Sections `[class^="section-"]`** | — | Landing / formation | **Non** |
| **Thème empilé** | `theme = ['github.com/lowdit/higo']` + replace local | `higo v0.9.1` + repogo, sligo, resugo, admonitions | BK : **bump** module + `hugo mod tidy` ; option `replace github.com/lowdit/higo => ../higo` en dev mono-repo |

### Écarts volontaires à ne pas « simplifier »

1. **Nav-back absolu** sur BK vs aligné `h1` sur la démo — deux intentions UX ; le thème propose le défaut accessible, BK garde l’override.
2. **Ordre titre/image** dans `header-split` — divergence visuelle réelle entre BK et exampleSite.
3. **Encart auteur** dans l’aside BK — contenu + asset site, pas générique Lowdit.

### Piste thème (lot futur, hors ce commit)

Paramètres `params.toml` : `post_show_author_box`, `post_header_image_position` (`image-title` \| `title-image`), `post_header_image_decor` — permettrait de **retirer** `layouts/posts/single.html` côté BK.

---

## 3. Actions recommandées côté BK (après publication Higo)

Ordre suggéré, **avec `hugo build` BK après chaque étape** :

1. Monter **github.com/lowdit/higo** (tag ou pseudo-version) avec le commit exampleSite.
2. **Supprimer** `layouts/_default/terms.html` (doublon).
3. **Retirer** dans `main.scss` le bloc `.header-split` **si** QA visuelle OK sur articles/conférences/jobs.
4. **Retirer** le bloc `media_url` du layout `posts/single.html` BK si identique au thème.
5. **Conserver** : `.nav-back` absolu, `.moto`, sections, list/single Repogo, `index.html`, expertises/conferences/jobs layouts.

---

## 4. Prêt pour exampleSite en ligne (GitHub Pages)

### Ce qui est OK

| Élément | Détail |
| --- | --- |
| **URL prod** | `exampleSite/config/production/hugo.toml` → `baseURL = 'https://lowdit.github.io/higo/'` |
| **Module** | `exampleSite/go.mod` + `replace github.com/lowdit/higo => ../` (CI checkout racine → thème cohérent) |
| **Build manuel** | `HUGO_SITE_DIR=exampleSite ./scripts/hugo-pages-build.sh "https://lowdit.github.io/higo/"` → **67 pages FR**, `exampleSite/public` |
| **Workflow** | `.github/workflows/gh-pages.yml` (non suivi git aujourd’hui) : Hugo 0.167 extended, artifact `exampleSite/public`, `deploy-pages` |
| **Doc** | `exampleSite/README.md`, vitrine `demo_url` (à confirmer dans `lowdit.github.io/data/modules.yaml`) |
| **Artefacts ignorés** | `public/`, `resources/` dans `.gitignore` racine |

### Bloquant / à corriger **avant** ou **dans** le commit Pages

1. **Racine Hugo détectée par le script**  
   `scripts/hugo-pages-build.sh` choisit `.` si `config/_default/hugo.toml` existe à la **racine du dépôt** (config thème Liftoff, ~**13 pages** EN).  
   **Sans correctif**, le job CI ne publie **pas** l’exampleSite.  
   **Correctifs possibles** (un seul suffit) :
   - fichier **`.github/hugo-site-dir`** contenant `exampleSite` ;
   - ou variable d’environnement **`HUGO_SITE_DIR=exampleSite`** dans `gh-pages.yml` ;
   - ou retirer/déplacer la config racine du chemin de détection (plus invasif).

2. **Fichiers à inclure dans le commit** (état `git status` local, branche `master`)  
   - **Modifiés** : SCSS, layouts, i18n, exampleSite content/config, etc. (~30 fichiers).  
   - **Non suivis indispensables** : `.github/workflows/gh-pages.yml`, `scripts/hugo-pages-build.sh`, `exampleSite/go.mod`, `exampleSite/README.md`, `docs/*`, nouveaux SCSS (`_measure`, `_tables`, `_forms`, skin, …), `layouts/contact/`, partials forms.  
   - **À ne pas committer** : `exampleSite/public/`, `exampleSite/resources/` (générés).  
   - **`exampleSite/assets/jsconfig.json`** : généré Hugo Pipes — peut être ignoré ou commité selon politique (racine `.gitignore` ignore `/assets/jsconfig.json` du **thème**, pas forcément exampleSite).

3. **Côté GitHub (hors git)**  
   - Activer **Pages** → source **GitHub Actions**.  
   - Environnement **`github-pages`** (premier déploiement).  
   - Branche poussée : **`master`** (workflow écoute `main` et `master`).

### Message de commit suggéré (quand tu valideras)

> Stabilise l’exampleSite FR (UX, a11y, peau agence) et ajoute le déploiement GitHub Pages pour la vitrine `/higo/`.

Corps : tooling `go.mod` + workflow Pages ; corriger `HUGO_SITE_DIR` ; ne pas inclure `public/`.

### Smoke test post-push

1. Action **Deploy Higo exampleSite to Pages** verte.  
2. `https://lowdit.github.io/higo/` — accueil FR, `/contact/`, `/projects/portfolio-project-4/`, article démo.  
3. Assets CSS/JS en 200 (baseURL avec trailing slash).  
4. (Optionnel) `hugo build` **bertrandkeller.github.io** avec nouvelle version Higo.

---

## 5. État git local (instantané)

- **Branche :** `master` (tracking `origin/master`).  
- **Dernier commit distant :** `e69ad2c fix: render-image`.  
- **Travail local :** non commité (M + ??), prêt **conceptuellement** après fix §4.1 et revue humaine du diff.

---

## 6. Liens

- [`NOTE-AMELIORATION-HIGO-ET-EXAMPLESITE.md`](./NOTE-AMELIORATION-HIGO-ET-EXAMPLESITE.md) — lots A/B/C.  
- [`ACCESSIBILITE-ET-DECOR.md`](./ACCESSIBILITE-ET-DECOR.md) — 75ch, contrastes, css-doodle.  
- [`exampleSite/README.md`](../exampleSite/README.md) — serve local / prod.
