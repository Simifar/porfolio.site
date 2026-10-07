# Design direction

## Audience and goal

This is a portfolio for a Product Manager looking for work. A recruiter or hiring manager should be able to understand the role, inspect real product decisions, see what was built, and find a direct contact route without having to interpret decorative visuals.

The portfolio separates verified company experience from personal product projects. The company roles and dates come from Egor's supplied career details. TaskFocus is published and has genuine signed-in dashboard screenshots. The material does not document user research or measured business impact.

## Design read

An individual Product Manager portfolio for recruiters, using a product-editorial language inspired by working notes and decision records. The visual system is calm, direct, and slightly asymmetric. It uses real product screenshots, compact labels, generous margins, and a single brick accent. Motion supports navigation and feedback without distracting from the content.

- Design variance: 7/10. Uneven image and text proportions add character while keeping the reading path predictable.
- Motion intensity: 6/10. Motion explains product decisions and changes of state: the hero marks the five-task limit, decision rows strike the rejected alternative, and the screenshot and project name travel between pages. All content remains complete and clear with reduced motion enabled.
- Visual density: 4/10. Project facts stay concise, with full reasoning reserved for case pages.
- Foundation: custom portfolio styling on the existing React, Vite, and Tailwind CSS stack. This is an editorial aesthetic, not an implementation of a third-party design system.

## Existing material to preserve

- React 18, Vite, TypeScript, Tailwind CSS 4, and React Router's `HashRouter`.
- GitHub Pages project path `/porfolio.site/`, all hash routes, and the existing section anchors.
- Static HTML case pages for search engines and social previews, generated from the same project content as the React views.
- English and Russian copy, persisted language choice, persisted light and dark themes, and dynamic page metadata.
- The existing name wordmark, navigation labels, verified screenshots, project order, repositories, live links, email, LinkedIn, and Telegram.
- Skip navigation, keyboard focus, image alt text, and `prefers-reduced-motion` support.

## Visual system

### Color

Use the same neutral and brick-red color family across the whole page. The color changes slightly between themes to retain readable contrast.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Page | `#F2F3EF` | `#141817` | Main canvas |
| Surface | `#E9ECE7` | `#1C2220` | Quiet project and navigation surfaces |
| Raised surface | `#F8F9F5` | `#222A27` | Screenshot surroundings and controls |
| Main text | `#202523` | `#F2F4EF` | Headings and primary copy |
| Secondary text | `#4C5652` | `#C0C9C3` | Paragraphs |
| Muted text | `#66716D` | `#9AA69F` | Captions and labels |
| Accent | `#A63B2D` | `#F27A65` | Links, focus, and primary actions |

Avoid gradients, ambient glows, noise overlays, and decorative status dots. Product screenshots remain faithful to their original colors.

### Typography and spacing

- Self-host IBM Plex Sans for display and body text, with IBM Plex Mono for brief project labels and technical metadata. Include Latin and Cyrillic subsets.
- Use a compact type scale with clear weight contrast, balanced headings, and body copy limited to a readable measure.
- Use an eight-pixel spacing rhythm, a centered content width near 1,240 pixels, and progressively wider desktop gutters.
- Keep controls and image frames square or lightly rounded. Let whitespace and rules, rather than nested cards, separate content.

### Motion

Every animation answers one of four questions: what matters here, what happened, where did it go, or what was decided. Decoration alone is not a reason to move.

- Easing: `--motion-ease` (`cubic-bezier(0.22, 1, 0.36, 1)`) for arrivals; a symmetric in-out curve only for wipes and strikes. UI feedback uses `--motion-ui` (260 ms); reveals run 700 to 900 ms.
- Properties: transform and opacity first. Clip-path wipes, the decision strike and the SVG annotation stroke are the only exceptions, and each covers a small area.
- Hero intro, once per visit: the headline rises word by word behind a mask, the supporting copy wipes up, a brick tick draws on the proof rule, then the TaskFocus screenshot dims and two marks outline the "5 of 5 slots" summary and the 5/5 counter. The screenshot stays real; the marks are an overlay, not a mock interface. Hover or focus on the figure lifts the dim.
- Scroll reveal: section headings, experience rows, project copy and case sections rise in once. Screenshots open with a top-down wipe. Anything already on screen when a page mounts is shown at once, and print shows everything.
- Brick ticks: a short accent segment marks where a record starts on its rule (hero proofs, experience rows). It draws in with the row.
- Decisions: the rejected alternative receives a thin accent strike and the chosen solution a vertical accent rule. Both stay visible as the static state.
- Page changes use the View Transitions API: the clicked screenshot and project name morph into the case header, and back again to the project card. The theme spreads as a circle from its toggle; language changes cross-fade. Browsers without the API and reduced-motion readers get instant changes.
- Reduced motion: no intro, no reveal, no view transitions, no scroll progress bar. The annotation, ticks, strikes and rules are shown in their final state.

## Page composition

### Home

1. A left-aligned role statement and one useful project preview form the first screen. The headline names the role; its short supporting copy describes the confirmed project work.
2. Company experience appears as open editorial rows. O!task and Web Do carry more detail; the technical and operational role at «Потенциал» is shorter. This section stays separate from personal projects.
3. TaskFocus and MindTrack remain the detailed cases. Their screenshots keep their original aspect ratios and their content blocks use different proportions instead of identical card shells.
4. CortexMap remains a screenshot-led additional project. Telegram Growth Analytics uses the supplied illustrative interface concept, clearly labeled as a concept with example figures rather than a screenshot of the local program.
5. “How I work” presents three evidence-backed themes: product framing, privacy and interpretation, and solo delivery with AI-assisted coding. Each points to its relevant case.
6. Contact keeps email as the primary action and LinkedIn and Telegram as direct secondary routes. A CV link appears only after a current PDF is supplied.

### Case pages

- Keep the current project URLs and the order of task, role and constraints, decisions, delivery, status, and validation.
- Use a quiet case header and one clear source or live-product action.
- Show each real screenshot beside its key point on desktop and stack the image above its caption on mobile. Do not crop important interface content to force a shared aspect ratio. TaskFocus uses a signed-in Today screenshot first, with Inbox, week and calendar images after the decision narrative.
- Present decisions as open editorial rows with a clear title and rationale, not a grid of repeated bordered cards.
- Keep additional projects concise and retain the real status of their public materials.

### Navigation and contact

- Keep the current desktop navigation labels and destinations.
- On mobile, put the section links in a second header row. This avoids a fixed bottom dock covering the project caption and other content.
- Keep theme and language controls available on both home and case pages.
- Use visible hover and focus states with the shared accent. Give buttons, links, page entry, and section navigation a brief, eased response. Avoid magnetic controls and movement that does not clarify an action.

## Responsive and accessibility rules

- At 320, 390, tablet, and desktop widths, keep text within the viewport and avoid horizontal scrolling.
- Stack project imagery and captions on narrow screens. Keep all project and contact links reachable with keyboard and touch.
- Keep a visible focus ring, descriptive names for icon-only controls, semantic headings and landmarks, and meaningful alt text.
- Honor `prefers-reduced-motion`; the complete experience must remain understandable with motion removed.
- Maintain readable text and control contrast in both themes. The page does not switch to an unrelated theme midway through a section.

## Search and publishing boundaries

- The React views retain hash routes for navigation on GitHub Pages. Canonical English and Russian HTML pages at `/work/<slug>/` and `/ru/work/<slug>/` expose case content and unique social metadata without requiring JavaScript. The in-app case links to its shareable HTML page.
- Preserve the homepage canonical URL, Open Graph and Twitter metadata, structured person data, repository links, and GitHub Pages path handling.
- Local previews and builds do not publish the site. No commit, push, or deployment is part of this redesign.
- Do not add metrics, employment claims, testimonials, client names, user research, or outcomes that are not present in verified project materials.
