#!/usr/bin/env bash
# Build Hugo site for GitHub Pages — exampleSite Higo.
set -euo pipefail

ROOT="${HUGO_ROOT:-$(pwd)}"
cd "$ROOT"

resolve_site_dir() {
  if [ -n "${HUGO_SITE_DIR:-}" ]; then
    echo "$HUGO_SITE_DIR"
    return
  fi
  if [ -f .github/hugo-site-dir ]; then
    tr -d ' \n\r' < .github/hugo-site-dir
    return
  fi
  # exampleSite avant la racine : config thème à la racine ≠ site à publier.
  if [ -f exampleSite/config/_default/hugo.toml ]; then
    echo "exampleSite"
    return
  fi
  if [ -f hugo.toml ] || [ -f config.toml ] || [ -f config/_default/hugo.toml ]; then
    echo "."
    return
  fi
  echo "ERROR: No Hugo config at repo root or exampleSite/" >&2
  exit 1
}

SITE_DIR="$(resolve_site_dir)"
BASE_URL="${1:-}"

if [ -z "$BASE_URL" ]; then
  echo "Usage: hugo-pages-build.sh <baseURL>" >&2
  exit 1
fi

echo "→ Hugo site directory: $SITE_DIR"

if [ -f "$SITE_DIR/go.mod" ]; then
  (cd "$SITE_DIR" && hugo mod get ./...)
fi

hugo -s "$SITE_DIR" --minify --environment production --baseURL "$BASE_URL"
echo "OK: $SITE_DIR/public"
