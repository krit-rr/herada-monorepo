#!/usr/bin/env bash
# Adds a path prefix to every root-relative URL in an assembled site folder.
# GitHub Pages serves a project site under /<repo>/ until a custom domain is
# set, while the pages link to /assets/..., /projects/... and so on. The deploy
# workflow passes configure-pages' base_path here: "/herada-monorepo" on the
# github.io address, empty once joinherada.com is the Pages domain, in which
# case nothing changes. Absolute URLs (https://..., //...) are left alone.
#   usage: bash tools/qa/prefix.sh _site /herada-monorepo
set -euo pipefail
root="${1:?folder}"; base="${2:-}"
[ -z "$base" ] && { echo "prefix: no base path, nothing to do"; exit 0; }
export BASE="$base"
find "$root" -type f \( -name '*.html' -o -name '*.css' \) -print0 | xargs -0 perl -0pi -e '
  s{((?:href|src)=")/(?!/)}{$1$ENV{BASE}/}g;
  s{((?:href|src)=\x27)/(?!/)}{$1$ENV{BASE}/}g;
  s{(url\(\s*["\x27]?)/(?!/)}{$1$ENV{BASE}/}g;
'
echo "prefix: root paths now start with $base"
