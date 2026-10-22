# ExampleSite Higo

Démonstration locale du thème **Higo** (fork [Hugo Liftoff](https://github.com/wjh18/hugo-liftoff)).

## Prérequis

- Hugo **≥ 0.156** (testé 0.167 extended)
- Dépôt cloné avec le symlink thème (voir ci-dessous)

## Lancer en local

```bash
cd exampleSite
hugo server
```

Build production (module GitHub + sorties Netlify) :

```bash
hugo build --environment production
```

## Résolution du thème

| Mode | Mécanisme |
| --- | --- |
| **Local** | `theme = ["github.com/lowdit/higo"]` + `go.mod` (`replace => ../`) |
| **Prod / CI** | `hugo build -e production` (baseURL dans `config/production`) |

**Ne pas** créer `themes/higo` → `../..` : Hugo parcourrait l’exampleSite en boucle.

Vérifier :

```bash
hugo mod verify
hugo build                    # prod : module GitHub + replace local
hugo server                   # dev : brouillons, live reload
```

## Parcours démo

1. Accueil — fil éditorial Lowdit  
2. [Article pilote](/posts/demo-parcours-editorial/)  
3. [Ressource](/resources/demo-fiche-accessibilite/)  
4. [Projet](/projects/portfolio-project-1/)

Le reste du contenu Liftoff (sous-sections, syntaxe Markdown, etc.) reste disponible pour les régressions de fonctionnalités.

## Peau « Agence Lowdit »

Dans `config/_default/params.toml` :

```toml
higo_skin = "agence-lowdit"
```

Tokens planche (crème / nuit / turquoise) — voir [`../docs/SKIN-BRAND-ET-AGENCE.md`](../docs/SKIN-BRAND-ET-AGENCE.md).

## GitHub Pages (vitrine lowdit.github.io)

- URL cible : `https://lowdit.github.io/higo/`
- Workflow : [`.github/workflows/gh-pages.yml`](../.github/workflows/gh-pages.yml) (à activer sur le dépôt `lowdit/higo`).
- Carte module : `lowdit.github.io/data/modules.yaml` → `demo_url`.

## Limites connues

- Contenu EN legacy dans certaines pages Liftoff — à migrer progressivement ou laisser en bac à sable.
- HTML brut dans quelques projets démo : `ignoreLogs = ['warning-goldmark-raw-html']` dans la config.
- Pas de stack Minigo / Repogo / Sligo ici — voir [`../docs/ROLE-ET-COMPOSITION.md`](../docs/ROLE-ET-COMPOSITION.md).
