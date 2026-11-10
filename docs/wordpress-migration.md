# Moving joinherada.com from WordPress.com to GitHub Pages

The WordPress site stays live until the last step, so nothing breaks while this
is in progress.

## Launch day, in order

Checked 2026-11-09: the live WordPress sitemap lists seven URLs (home, `/news/`,
`/contact-us/` and the four posts) and every one of them exists in `site/` at
the same path, so the switch breaks no inbound link and needs no redirects.
The domain's name servers are `ns1-3.wordpress.com`, so DNS is edited at
WordPress.com (Domains, joinherada.com, DNS records). There are no MX or TXT
records to preserve, and `www` is an alias of the apex.

1. Krit: WordPress, Tools, Export, All content; save the file in
   `docs/wordpress-export/`. Export the subscriber list if there is one.
2. Krit: repo Settings, Pages, Source, GitHub Actions.
3. Claude: merge the open PRs in order (#1, #3, #2, then #4 if wanted) and
   confirm the "Deploy site" run goes green. The preview address will look
   unstyled; that is expected until step 5.
4. Krit: repo Settings, Pages, Custom domain, `joinherada.com`, Save.
5. Krit: at WordPress.com DNS records, replace the two WordPress `A` records
   on the apex with GitHub's four, add the `www` CNAME to `krit-rr.github.io`,
   leave everything else. Records are listed in step 4 below.
6. Both: wait for the DNS check on the Pages settings page to pass (minutes to
   an hour), then tick Enforce HTTPS; the certificate can take up to an hour.
7. Claude: verify the live site: every URL from the WordPress sitemap answers
   200 with the new page, the link check and the phone-width sweep pass
   against joinherada.com itself, the 404 page and the sitemap serve.
8. The projects stay unlinked from the main site and carry a `noindex` tag, so
   they deploy and can be shared by address but stay out of search engines and
   the sitemap. To go public later: remove the tag from `site/projects/`
   and each project page, and link `/projects/` from the home page or header.
9. Krit, a few days later: downgrade the WordPress.com plan, keep the domain
   registration there.

## 1. Get the repo online

- [x] Create a GitHub repository and push this folder to `main` (it became
      `herada-monorepo`).
- [ ] In the repo: Settings → Pages → Source → **GitHub Actions**. Until this
      is set, every "Deploy site" run fails at its configure-pages step with
      "Not Found"; nothing else is wrong with the workflow.
- [ ] Wait for the "Deploy site" action to finish, then open the preview URL
      it reports. Note: on the preview URL (`<user>.github.io/herada-monorepo/`) styles
      and links will be broken, because the site uses paths that start at the
      domain root. They work once the custom domain is attached in step 4. To
      check the design before then, open the files locally (see README).

## 2. Bring over what's on WordPress

- [x] Logo files: `full-logo-white.png` is painted in any color by a CSS
      mask, so no recolored wordmarks are needed; the monogram favicon and a
      touch icon are in place on every page (see that folder's README).
- [x] Copy `herada-additional-css.css` and `herada-page-blocks.html` from the
      Aug 25 redesign into `docs/wordpress-export/` for reference.
- [x] Decide what happens to the existing pages: **Product**, **News**,
      **Contact Us**. News and Contact Us are rebuilt at the same paths;
      Product is already gone from the live site (the direction changed;
      Coverage Monitor keeps the idea as a prototype under `projects/`), so
      nothing needs a redirect.
- [x] Rewrite the homepage hero for the new direction.
- [ ] WordPress → Tools → Export, and save the export file in
      `docs/wordpress-export/` as a backup of posts and pages.

## 3. Things WordPress did that a static site doesn't

- **Forms:** the early access button links to the existing Google Form, so
  nothing to replace.
- **Subscribers:** WordPress.com has a built-in "Subscribe" feature. If anyone
  has subscribed, export that list before leaving.
- **Editing:** every change is now a file edit and a commit.
- **RSS:** WordPress served `/feed/`. The static site serves
  `news/feed.xml`, hand-written with one item per post (add an item when a
  post is added), and announces it from the home and news pages. `/feed/`
  shows a short note pointing readers there, so the old address does not
  404.

## 4. Switch the domain

- [x] Find out where `joinherada.com` is registered: its name servers are
      `ns1.wordpress.com`, `ns2.wordpress.com` and `ns3.wordpress.com`, so it
      is managed at WordPress.com. It can stay registered there with DNS
      pointed at GitHub.
- [ ] In the repo: Settings → Pages → Custom domain → `joinherada.com`. The
      domain lives in that setting, not in the repo: when a site is published
      from a GitHub Actions workflow, GitHub ignores any `CNAME` file, so
      there is none in `site/`.
- [ ] At WordPress.com (Domains, joinherada.com, DNS records), replace the
      two WordPress `A` records on the apex (192.0.78.24 and 192.0.78.25)
      with GitHub Pages' four, and point `www` at `krit-rr.github.io`:

          A      @     185.199.108.153
          A      @     185.199.109.153
          A      @     185.199.110.153
          A      @     185.199.111.153
          CNAME  www   krit-rr.github.io

      Confirm the four addresses against GitHub's "Managing a custom domain
      for your GitHub Pages site" page before saving; they have been stable
      for years but GitHub owns the list.
- [ ] Once the domain check passes, turn on **Enforce HTTPS**.
- [ ] Check the site, the form link and email links on a phone and a laptop.

## 5. After the switch

- [ ] Downgrade or cancel the WordPress.com plan (keep the domain registration
      if it lives there).
- [ ] Confirm `joinherada@gmail.com` and any domain email still work.
