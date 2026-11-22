#!/usr/bin/env bash
# Writes <out>/sitemap.xml: one <url> per index.html in the assembled site,
# dated by the last commit that touched the page's source file, or today when
# no history is available. 404.html is left out on purpose, and so is any page
# that carries a robots noindex tag: those deploy, and can be shared by
# address, but are not announced to search engines.
# A dozen lines of shell, not a build tool. Run from the repository root:
#   bash tools/qa/sitemap.sh _site [https://joinherada.com]
set -euo pipefail
out="${1:-_site}"
base="${2:-https://joinherada.com}"
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  find "$out" -name index.html | sort | while read -r page; do
    grep -q 'name="robots" content="noindex' "$page" && continue
    path="${page#"$out"}"
    case "$path" in
      /projects/*/*) rest="${path#/projects/}"; name="${rest%%/*}"; src="projects/$name/public/${rest#"$name"/}" ;;
      *)             src="site$path" ;;
    esac
    date=$(git log -1 --format=%cs -- "$src" 2>/dev/null || true)
    echo "  <url><loc>${base}${path%index.html}</loc><lastmod>${date:-$(date -u +%F)}</lastmod></url>"
  done
  echo '</urlset>'
} > "$out/sitemap.xml"
echo "wrote $out/sitemap.xml with $(grep -c '<url>' "$out/sitemap.xml") urls"
