# EGOR.EXE — Tech Arena

A bilingual IT support and PC hardware portfolio. The landing page combines a playable-looking lobby with direct access to Egor’s experience, projects, contact details and PDFs.

## What comes from the reference

| Observed in Brawl Stars | Application in Tech Arena |
| --- | --- |
| The lobby puts a readable character silhouette and scene at the centre. Actions live around it, with a prominent yellow entry button beside the mode card. | Relay stands in an illustrated service yard. A compact turntable console sits below the figure. Yellow leads to the technical experience, and two panels lead to the workshop and brawler guide. |
| The character browser uses a portrait roster, a full-body preview, class, rarity and information about abilities. | The guide shows Spike, Poco, Nita and El Primo with their actual portraits and named attacks. A direct choice updates the preview and explanation. |
| The illustrated arenas distinguish traversable lanes, cover and a focal point through silhouette and colour. | The workshop map places five pieces of equipment amid raised walls and visible paths. Markers and an equivalent row of buttons open factual descriptions and links. |
| Game modes are identified by short labels, icons and different objectives. | Three guide cards explain Gem Grab, Brawl Ball and Knockout and display their published icons. |

References include the [official Brawl Stars page](https://supercell.com/brawlstars/en/) and [its published gameplay capture](https://supercell.com/games/brawlstars/videos/social/social.mp4). The portfolio’s robot, environment, interface and equipment art are original. The game media is presented in the guide to identify and discuss the game, with the [source URLs, checksums and terms](public/brawl-guide/ASSET-SOURCES.md).

## Figure and media

Relay is modelled in Blender and rendered from eight fixed positions. The first view loads with the lobby. Buttons and horizontal swipes select another angle, and the previous rendered view remains visible until the next is decoded. The downloadable GLB contains the editable geometry and materials. To regenerate the assets with Blender 4.3+ and ImageMagick installed, run:

```sh
blender -b -t 3 --python-exit-code 1 -P scripts/art/build-relay.py
node scripts/generate-social-image.mjs
```

The guide starts with a poster. Pressing Play loads the selected brawler’s official clip. The corresponding poster returns when it ends. Character names and explanations remain available when media fails or the codec is unavailable.

## Layout and access

Warm yellow actions, a lilac service yard, inky outlines and cream text provide the lobby’s contrast. The light and dark themes use muted violet surfaces so the lobby, guide and map carry the strongest colour. Both Rubik One and IBM Plex are served locally and cover Cyrillic. The layout places the identity, model and controls in reading order on phones. The header collapses below 1024px.

Skills distinguish documented hands-on work, practical exposure and current study. The filtering UI and workshop offer keyboard and touch controls. Detailed experience, case pages, static bilingual HTML and contact links remain directly accessible. Reduced motion removes the interface animations. The turntable and game clips start only through user input.

## Screenshots

- [Desktop lobby](docs/screenshots/brawl-lobby/desktop.webp)
- [Phone lobby](docs/screenshots/brawl-lobby/phone.webp)
- [Phone brawler guide](docs/screenshots/brawl-lobby/brawlers.webp)
- [Workshop map](docs/screenshots/brawl-lobby/workshop.webp)
