#!/usr/bin/env python3
"""Check the assembled site for broken internal references.

Usage, from the repository root, after assemble.sh and sitemap.sh:

    python3 tools/qa/linkcheck.py _site

Every href, src and CSS url() in the .html and .css files must point at a
file that exists in the assembled tree (a directory counts when it holds an
index.html). External links, mailto, tel, data URIs, bare anchors and the
contents of <script> blocks are skipped. The sitemap must parse as XML and
robots.txt must exist. Exits 1 on any failure.
"""
import os
import re
import sys
import xml.dom.minidom

REF = re.compile(r'''(?i:href|src)\s*=\s*["']([^"'#?]+)|url\(\s*["']?([^"')#?]+)''')
SCRIPT = re.compile(r"<script\b.*?</script>", re.S | re.I)
SKIP = ("http://", "https://", "mailto:", "tel:", "data:", "//", "javascript:")


def main(root):
    problems = []
    sitemap = os.path.join(root, "sitemap.xml")
    if os.path.isfile(sitemap):
        try:
            xml.dom.minidom.parse(sitemap)
        except Exception as err:  # noqa: BLE001
            problems.append(f"sitemap.xml does not parse: {err}")
    else:
        problems.append("sitemap.xml missing (run tools/qa/sitemap.sh first)")
    if not os.path.isfile(os.path.join(root, "robots.txt")):
        problems.append("robots.txt missing")

    checked = 0
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if not fn.endswith((".html", ".css")):
                continue
            page = os.path.join(dirpath, fn)
            text = open(page, encoding="utf-8", errors="replace").read()
            if fn.endswith(".html"):
                text = SCRIPT.sub("", text)
            for m in REF.finditer(text):
                u = (m.group(1) or m.group(2) or "").strip()
                if not u or u.startswith(SKIP):
                    continue
                checked += 1
                if u.startswith("/"):
                    target = os.path.join(root, u.lstrip("/"))
                else:
                    target = os.path.normpath(os.path.join(dirpath, u))
                if not (os.path.isfile(target) or os.path.isfile(os.path.join(target, "index.html"))):
                    problems.append(f"{os.path.relpath(page, root)}: {u}")
    print(f"checked {checked} internal references in {root}: {len(problems)} problem(s)")
    print("\n".join(problems))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "_site"))
