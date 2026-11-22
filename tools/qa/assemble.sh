#!/usr/bin/env bash
# Assembles the site the way GitHub Pages serves it:
#   site/                    -> <out>/
#   projects/<name>/public/  -> <out>/projects/<name>/   (folders starting with _ are skipped)
# Plain copying, no build tool. Run from the repository root:
#   bash tools/qa/assemble.sh _site
set -euo pipefail
out="${1:-_site}"
case "$out" in ""|"."|"/"|"site"|"projects"|"tools"|"data"|"docs") echo "refusing to assemble into '$out'" >&2; exit 2 ;; esac
rm -rf "$out"
mkdir -p "$out"
cp -r site/. "$out"/
for dir in projects/*/public; do
  [ -d "$dir" ] || continue
  name=$(basename "$(dirname "$dir")")
  case "$name" in _*) continue ;; esac
  mkdir -p "$out/projects/$name"
  cp -r "$dir/." "$out/projects/$name/"
done
echo "assembled $(find "$out" -type f | wc -l) files into $out"
