# Minimal WordPress site — applied to joinherada.com on Oct 8, 2026

Interim version of the site while the direction changes. These files are the
record of what is live.

- Homepage: header, hero (mission line) and footer on radicchio (#AD1457)
  with paper type. One flipped section between (paper, radicchio type, the
  `hr-flip` class) holds the "in progress" note and the upcoming projects as
  small square tiles (`hr-tile`; colors cycle radicchio, periwinkle,
  violet-black). Tiles show status and name, no links.
- News: paper ground, a grid of square photo tiles (featured image, date,
  title), live from the posts.
- Contact: paper ground. An invitation, three examples of who should write,
  the email button, and two short notes (why she asks, what to expect).
- Header: logo, News, Contact (both pages). Footer: logo, plus mail and Instagram icons.
  No copyright line. Instagram appears only in the footer.
- Fonts: Headings set to Bricolage Grotesque and Text to Figtree in
  Styles > Typography (that is what loads the font files).

## Where each file lives in WordPress (Appearance > Editor)

| File | Place |
| --- | --- |
| `herada-minimal.css` | Styles > Additional CSS (a minified copy) |
| `home-blocks.html` | Template part "Home Now" (`home-now`), used by the Home Now template |
| `news-blocks.html` | Template "News" (`news-2`) |
| `contact-blocks.html` | Template "Contact Us" (`contact-us-2`) |
| `header-part.html` | Template part "Header" |
| `footer-part.html` | Template part "Footer" |
| `single-post-template.html` | Template "Single Posts" (`single`): title, date, content |
| `previous-additional-css.css` | What Additional CSS held before |

## Things learned the hard way

- WordPress.com strips CSS variables (`--x: ...`) and logical properties
  (`padding-inline`, `margin-inline`, `padding-block`) from Additional CSS on
  save. The stylesheet writes every color out and avoids both.
- The pages are built in Site Editor templates, not in page content. The
  old Contact Us text is still in the page itself, just not shown.
- The logo upload is a white PNG; the stylesheet uses it as a mask so it
  shows radicchio on paper pages and paper on the homepage.
- Old versions: every template, template part and the styles keep
  revisions in the Site Editor, so each change can be rolled back there.

## Oct 9 follow-ups

- Design audit: bigger intro lines, bigger and wider-spaced project tiles,
  bigger buttons, footer pinned to the bottom on short pages, hero headline
  scaled up to fill the width, header links uppercase with an underline
  marking the current page.
- Post pages rebuilt as title, date and content. The theme's demo author
  blurb, book ad, comment box and grey footer are gone; the share/like strip
  is hidden by the stylesheet.
- Contact page content added in Krit's words: who should reach out, why she
  asks, and what to expect on reply time and scheduling. Big invitation and email
  button on top, then three columns (examples, why, what to expect) that stack
  on phones.
- Post title typo fixed ("Reaching an Early Funding Milestone"); its address
  is unchanged.

- Krit edits wording directly in WordPress (she renamed the three Contact
  column headings herself on Oct 9). Treat the live site as the source of
  truth for copy and re-read a template before replacing it.

## Not changed

- The Product page is set to Draft (not deleted).
- The Contact page keeps its address `/contact-us/`; only its title changed.
