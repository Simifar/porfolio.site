# EGOR.EXE — Tech Arena

A Brawl Stars-inspired portfolio for **IT Support / PC Hardware / Desktop Support**. Tech Arena is the published design on `master`, following the owner's release approval.

## Direction

A confident arcade lobby, with oversized rounded headlines, hard ink outlines, saturated blue/purple surfaces, yellow primary actions, mint technical accents and collectible-looking equipment cards. The real career story remains the reading path; game vocabulary supplies personality rather than proficiency claims.

The artwork is original. `TechMascot.tsx` depicts a fictional repair-crew character, not an owner portrait or a game character. `EquipmentIcon.tsx` supplies ten bespoke gadget illustrations. `ArenaScene.tsx` arranges the five technical topics on a selectable board. No official Brawl Stars characters, logos, insignia or textures are used. No WebGL, audio, game gate, random rewards, backend or new runtime dependencies.

## System

`src/styles/arena.css` provides a complete replacement for the previous Minecraft world layer. It follows the preserved case/motion foundations in `src/index.css`.

| Role | Dark | Light |
|---|---|---|
| Canvas | #101c43 | #edf3ff |
| Secondary panel | #192e61 | #e1e8ff |
| Raised panel | #213b78 | #fffdf8 |
| Main text | #fffdf6 | #19213e |
| Secondary text | #d3def9 | #3b4c74 |
| Text accent | #ffcf48 | #5f32b1 |
| Technical accent | #80e9d3 | #126c62 |
| Primary button | #ffcf48 | #ffcf48 |
| Structural ink | #11172f | #11172f |

Rubik One is the local display face, Cyrillic-verified and SIL OFL licensed. The 150KB source TTF is delivered as a 40KB WOFF2 conversion with all glyphs preserved. IBM Plex Sans/Mono remain the reading/utility faces. Fonts make no third-party requests. Static cases receive the same display font under a stable, base-relative `/fonts/` URL during `prepare-pages.mjs`.

Panels have 2–3px ink borders, 7–14px corners and hard extruded shadows. Headline outlines and small angled stickers provide the action-game character. Reading copy stays upright and conventionally spaced. Touch controls expose real pressed, focus and selected states; decorative movement is limited to brief hover/press feedback. Reduced motion disables it.

## Reading structure

1. Hero: BUILD. FIX. REPEAT., actual name/role, factual introduction, three direct actions, original technician mascot and verified facts.
2. Player dossier: readable biography, qualification, location and practice summaries.
3. Gear loadout: eight factual equipment/knowledge topics, native radio filters, selected detail and all-skills text alternative.
4. Mission records: full hardware work at Potencial, historical O!task/Web Do and education.
5. Project lineup: genuine TaskFocus/MindTrack/CortexMap screenshots, case pages, live products and source links.
6. Practice arena: five native controls and five equivalent map hotspots, selected technical context and supporting links.
7. Milestones: 50+ computers, 2026 qualification and three published software projects.
8. Contact lobby: direct email/clipboard, GitHub/LinkedIn/Telegram and both original PDF resumes.

## Data and interaction

Career/project data remain unchanged. Hands-on PC assembly, maintenance, equipment inventory and documentation are distinct from practical Windows Server/1C exposure and current Windows/Debian/virtualization study. No ranks, XP, certifications, fabricated user counts or commercial outcomes.

Filtering skills automatically selects the first matching item; selection always belongs to the visible set. Native radios support keyboard and touch. Existing button selection/live regions and phone scroll-to-explanation remain. The complete text alternative always includes all eight skills regardless of filter. The SVG board has corresponding native HTML controls, so information never depends on interpreting the illustration or hovering.

## Responsive and validation

1240px content width; mobile gutters 16–20px. The hero places identity/actions/facts before the mascot on mobile. Navigation collapses below 1024px so tablet controls remain reachable. Two-column touch loadout, wrapping filters, long Russian qualification names and email controls are checked at narrow widths. Static decision labels stack above their explanations below 481px. The case galleries, static bilingual SEO, PDF, saved preferences, HashRouter and `/porfolio.site/` base remain functional.

Run `npm ci`, `npm run typecheck`, `npm run build`, `CI=true npm run test:e2e` (Chromium Headless Shell, same as Actions), and configured Lighthouse CI. `node scripts/generate-social-image.mjs` renders the 1200×630 social card from the actual mascot source. Publication remains a separate owner decision.
