# Birthday Surprise — Static Website

## How to open
1. Download and extract the ZIP.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari). No build step required — works offline.

## Files
- `index.html` — Landing page (teaser) with typewriter message and CTA.
- `surprise.html` — Surprise page with whiteboard, poem, recipient image, cat illustration, and actions.
- `css/styles.css` — Theme variables and responsive styles.
- `js/script.js` — Typing effect, confetti, sound, share, copy link, download as PNG.
- `assets/her.jpg` — Replace this placeholder with the recipient photo (keep filename).
- `assets/cat.png` — Replace with your preferred cat illustration (keep filename).

## How to customize
- Replace `assets/her.jpg` with your friend's photo (same filename).
- Replace `assets/cat.png` if you'd like a different cat image.
- Change the poem or landing message in `surprise.html` (inside `<pre id="poem-text">`) and `index.html` (the `birthdayMessage` constant in `js/script.js`) if needed.

## Acceptance checklist
- [ ] Responsive layout (mobile-first; stacks on small screens)
- [ ] Landing page: typewriter effect and CTA visible
- [ ] Clicking CTA triggers confetti + short sound and navigates to surprise page
- [ ] Surprise page: whiteboard with poem (line breaks preserved), recipient image, cat illustration
- [ ] Buttons: Back, Share (WhatsApp), Copy Link, Download Card work
- [ ] Accessible: alt text, keyboard focus on buttons
- [ ] Offline: Works by opening `index.html` directly

## Notes & known limitations
- The "Download Card" feature renders a simple image using canvas; complex styles (shadows, custom fonts) may not be preserved exactly.
- Audio may be blocked by browser autoplay policies until user interacts with the page.

Enjoy — and happy birthday to your friend! 🎉
