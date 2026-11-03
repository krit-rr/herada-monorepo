# Moving joinherada.com from WordPress.com to GitHub Pages

The WordPress site stays live until the last step, so nothing breaks while this
is in progress.

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

- [ ] Add the four logo PNGs to `site/assets/img/` and swap them in
      (instructions in that folder's README). One is in place
      (`full-logo-white.png`); the raspberry and paper wordmarks and the
      monogram favicon are still missing, so pages have no favicon yet.
- [x] Copy `herada-additional-css.css` and `herada-page-blocks.html` from the
      Aug 25 redesign into `docs/wordpress-export/` for reference.
- [ ] Decide what happens to the existing pages: **Product**, **News**,
      **Contact Us**. Each one is either rebuilt under `site/`, folded into
      another page, or dropped. So far News and Contact Us are rebuilt;
      Product is not, since the direction changed (Coverage Monitor keeps
      the idea as a prototype under `projects/`).
- [x] Rewrite the homepage hero for the new direction.
- [ ] WordPress → Tools → Export, and save the export file in
      `docs/wordpress-export/` as a backup of posts and pages.

## 3. Things WordPress did that a static site doesn't

- **Forms:** the early access button links to the existing Google Form, so
  nothing to replace.
- **Subscribers:** WordPress.com has a built-in "Subscribe" feature. If anyone
  has subscribed, export that list before leaving.
- **Editing:** every change is now a file edit and a commit.

## 4. Switch the domain

- [ ] Find out where `joinherada.com` is registered. If it was bought through
      WordPress.com, it can stay registered there with DNS pointed elsewhere,
      or be transferred to another registrar.
- [ ] In the repo: Settings → Pages → Custom domain → `joinherada.com`. The
      domain lives in that setting, not in the repo: when a site is published
      from a GitHub Actions workflow, GitHub ignores any `CNAME` file, so
      there is none in `site/`.
- [ ] At the DNS provider, replace the WordPress records with GitHub's: four
      `A` records for the root domain and a `CNAME` for `www` pointing to
      `<user>.github.io`. GitHub's Pages documentation lists the current IP
      addresses.
- [ ] Once the domain check passes, turn on **Enforce HTTPS**.
- [ ] Check the site, the form link and email links on a phone and a laptop.

## 5. After the switch

- [ ] Downgrade or cancel the WordPress.com plan (keep the domain registration
      if it lives there).
- [ ] Confirm `joinherada@gmail.com` and any domain email still work.
