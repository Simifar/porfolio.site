# EGOR.EXE — A Tech World

A Minecraft-inspired professional portfolio for **IT Support / PC Hardware / Desktop Support**, by Egor Matafonov. Historical product/growth and presale roles remain biography, not current positioning.

## Visual direction

An original computer workshop on a grass-and-earth voxel island. The design takes the care in composition, type and interactions of the Samiran De reference, without reproducing its layout or assets. No official Minecraft textures, characters, logos or third-party artwork are used. No WebGL, audio, game gate or backend.

`WorkshopScene.tsx` draws deterministic isometric facets in SVG: desk, diagnostic display, tower, rack, tools and laptop. `PixelIcon.tsx` contains original 16×16 sprites. Both illustrations and controls work without image downloads.

## Tokens

The final theme tokens live in `src/styles/world.css`. Existing rich case layouts and motion utilities remain in `src/index.css`; the world stylesheet follows them deliberately.

| Role | Dark | Light |
|---|---|---|
| Canvas | #101713 | #eef0e4 |
| Panel | #17211b | #e1e6d6 |
| Raised surface | #1b2820 | #f8f8ee |
| Main text | #e9e7d9 | #203026 |
| Secondary text | #b0bfaa | #435744 |
| Border | #344335 | #b7c3ab |
| Lime | #a2d66b | #3c6b27 |
| Technical cyan | #70cbb7 | #246c61 |
| Brass | #d5af78 | #805423 |

IBM Plex Sans handles reading; IBM Plex Mono handles small HUD labels; Pixelify Sans handles display type. All fonts are local, support Cyrillic, use `font-display: swap`, and retain SIL Open Font License files in `src/assets/fonts`. Pixelify is 49KB. No third-party font requests are made.

Panels use square corners, thin borders and restrained inset shadows. Controls have pressed, hover and focus states. Desktop spacing is 94px between chapters; mobile 64px. Content width is 1240px. Mobile gutters are 16–20px.

## Reading order

1. **Enter my world:** identity, real experience, three actions and original scene.
2. **Player profile:** readable biography, education and four technical-practice summaries.
3. **Inventory:** eight native toggle buttons, experience status, live detail panel and complete text alternative.
4. **Quest log:** primary hardware work at Potencial, earlier O!task and Web Do roles, education.
5. **Crafted projects:** actual application screenshots, real links and unchanged substantive cases.
6. **Workstation:** five native object controls, optional scene hotspots, highlighted objects and factual detail.
7. **Milestones:** 50+ PCs, 2026 qualification and three published software projects.
8. **Connect:** direct email, copy button, GitHub, LinkedIn, Telegram and localized PDF.

## Data integrity

`experience.ts` and `projects.ts` retain original claims and links. `world.ts` adds bilingual UI and evidence-based skill descriptions. Hardware, equipment inventory and documentation are hands-on; Windows Server / 1C are practical exposure; Windows, Debian and virtualization are learning. No skill levels, XP, certifications, user counts or commercial outcomes are invented. Equipment inventory is used instead of asserting an unverified networking skill.

## Accessibility and motion

Native buttons expose selection with `aria-pressed` and `aria-controls`; live regions announce selected information. All selected information also appears in the profile, projects or inventory text view. The scene is an accessible image; HTML controls provide equivalent actions. Hover is optional. Visible keyboard focus, skip link, mobile menu Escape handling, preserved command menu and 44px primary touch targets remain.

Reduced motion disables animation and transition motion; content remains visible. No endlessly moving objects or flashing HUD. Both themes and EN/RU are first-class layouts at 320, 390, 768 and 1440px. Static cases retain semantic HTML, metadata, canonical URLs, real screenshots and direct contact links.

## Reproduction and release

`npm ci`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm run lighthouse`. `CHROME_PATH` can select an installed Chromium executable for tests and asset generation. `node scripts/generate-social-image.mjs` creates the 1200×630 social image from the same scene; the existing portfolio asset generator also invokes it after generating PDFs.

The feature is reviewed in a PR. Production deployment remains the existing master-only Pages workflow; do not merge or invoke it without the owner's separate confirmation.
