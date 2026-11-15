# Privacy: what we do, and what we would do if something went wrong

Draft for Krit's review, November 2026. A plan, not legal advice.

## What exists

- The site is static files on GitHub Pages. No accounts, no database, no
  server of ours. GitHub's own request logs are GitHub's.
- No cookies, no analytics, no ad pixels, no session recording, no
  third-party scripts. The only outside request a page makes is to Google
  Fonts. Audited 2026-11-10 across every page.
- The Ledger stores its record in the visitor's browser (`localStorage`)
  and generates printouts, images and backups on the device. The quizzes
  store nothing. Nothing from either reaches us.
- Email to joinherada@gmail.com is the only personal information we hold:
  the sender's address and what they wrote, in the inbox, used to reply.
- The Learn page's sign-up is a set of `mailto:` links. There is no form
  on the site and nothing is collected when the page is opened.
- The Misrouting Registry, when it opens, runs on a separate consented
  form service with its own terms. Export files from it are research data
  and get their own README under `data/` before any analysis.

## Why this matters

The Ledger very likely counts as a personal health record under the FTC's
Health Breach Notification Rule, and quiz answers and symptom entries are
health information. FTC v. GoodRx (2023, $1.5M) and FTC v. BetterHelp
(2023, $7.8M) were about sharing health data with advertising platforms.
The rule here is simple: no ad pixels, no session replay, no third-party
tags on any page that touches symptoms, quizzes or the Ledger. If analytics
are ever added, they are first-party and cookieless (Plausible or
GoatCounter), and they never record a health event: allowed events are
print, copy-to-notes, download and email-signup, nothing about what was
checked, entered or answered.

## What would count as a breach for us

1. A tampered deployment: a change to the published pages that sends
   Ledger or quiz data off the device. The deploy workflow runs only from
   `main`; the QA workflow checks every pull request; the repository is
   the only source.
2. A mistake of our own: a tool update that posts data somewhere, or a
   backup file that is not what it says it is.
3. The inbox: unauthorised access to the email account.
4. The Registry: a breach at the form service, or an export file handled
   carelessly.

## What we would do

1. Stop it: revert the deployment (push the last good commit to `main`,
   or disable Pages) within hours of discovery; rotate the email
   password; suspend the survey.
2. Establish the facts: what data, which dates, how many people, how we
   know. Write them down as they are found, with timestamps.
3. Tell people: a notice on this site and, where we have addresses,
   by email, in plain language, within the deadline the Health Breach
   Notification Rule sets (no later than 60 calendar days after discovery,
   and check the current rule text before acting). Notify the FTC as the
   rule requires for the number of people affected, and the media where it
   requires that too.
4. Fix the cause, add a check that would have caught it, and write a dated
   post-mortem in this folder.

## Keep this true

- Before adding any script, tag or embed to a page, re-run the audit: no
  `<script src>` to another host, no pixel images, no iframes.
- Keep `/privacy/` on the site in step with this note: it states only what
  we actually do.
