# EGOR.EXE — Tech Arena

A bilingual portfolio for Egor Matafonov’s work in IT support and PC hardware. Egor’s name and specialization lead the first screen. The yellow action opens his experience. The two panels under the profile facts lead to his software projects and interactive workshop.

The lobby takes cues from the oversized title lettering, stage lighting, raised controls and selection feedback of Brawl Stars. The stage, terrain, figure and equipment illustrations are original. The character display is a way to present Relay, the workshop mascot. The work cards show screenshots of Egor’s own projects. [Visual reference](https://supercell.com/brawlstars/en/)

## Motion

Relay lands with a short squash and rebound. Each turn keeps the current image visible while the next angle decodes, then settles into the new view. The selected item in the skills inventory or on the workshop map pops into its preview. The project title and screenshot travel from the card into the corresponding case when the browser supports View Transitions.

Motion is brief and serves the selected action. The interface honors reduced motion. Names, descriptions and controls work with direct links, the keyboard or touch in either theme and language.

## Media

Relay is modelled in Blender and rendered from eight fixed positions. The first view loads with the lobby. Buttons and horizontal swipes change the angle. The downloadable GLB contains the geometry and materials. To regenerate the assets with Blender 4.3+ and ImageMagick installed, run the following commands from the repository root.

```sh
blender -b -t 3 --python-exit-code 1 -P scripts/art/build-relay.py
node scripts/generate-social-image.mjs
```

## Screenshots

- [Desktop portfolio](docs/screenshots/brawl-lobby/desktop.webp)
- [Phone portfolio](docs/screenshots/brawl-lobby/phone.webp)
- [Workshop map](docs/screenshots/brawl-lobby/workshop.webp)
