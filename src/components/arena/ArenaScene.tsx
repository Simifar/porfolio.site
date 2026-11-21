import type { ItemKind } from '../../content/world';

export type StationObject = 'pc' | 'monitor' | 'server' | 'toolkit' | 'terminal';

export const arenaStations: {
  id: StationObject;
  kind: ItemKind;
  x: number;
  y: number;
}[] = [
  { id: 'pc', kind: 'pc', x: 128, y: 173 },
  { id: 'monitor', kind: 'windows', x: 359, y: 97 },
  { id: 'server', kind: 'server', x: 585, y: 173 },
  { id: 'toolkit', kind: 'tool', x: 209, y: 346 },
  { id: 'terminal', kind: 'terminal', x: 507, y: 346 },
];

// Each drawing sits in the same 112 × 104 cabinet space, lit from the upper left.
function EquipmentDrawing({ kind }: { kind: ItemKind }) {
  switch (kind) {
    case 'pc':
      return (
        <>
          <path d="m22 19 23-14 45 8-22 17Z" fill="#d4f4ea" />
          <path d="m68 30 22-17-1 67-21 18Z" fill="#346578" />
          <path d="m73 34 11-9v45l-11 9Z" fill="#254755" strokeWidth="1.8" />
          <path d="m76 42 5-4m-5 11 5-4m-5 11 5-4m-5 11 5-4" stroke="#679baa" strokeWidth="2" />
          <path d="m22 19 46 7v72l-46-8Z" fill="#78b5c6" />
          <path d="m26 24 36 5v58l-36-6Z" fill="#d5e9de" />
          <path d="m30 31 25 4v5l-25-4Z" fill="#416477" strokeWidth="1.3" />
          <path d="m29 78 30 4" stroke="#82a99c" strokeWidth="2" />
          <circle cx="44" cy="58" r="14" fill="#517988" />
          <circle cx="44" cy="58" r="10.5" fill="#294858" strokeWidth="1.4" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <path key={angle} transform={`rotate(${angle} 44 58)`} d="M44 57q-7-7-2-9 5 0 5 5l-2 5Z" fill="#78d3c4" stroke="none" />
          ))}
          <circle cx="44" cy="58" r="2.8" fill="#d5fff0" strokeWidth="1" />
          <path d="m29 84 11 2m5 1 4 .6" stroke="#ffb054" strokeWidth="3" />
          <path d="m29 17 15-8 26 4" fill="none" stroke="#f2fff0" strokeWidth="2" />
          <path d="m27 92 5 1m27 4 5 1" strokeWidth="3.3" />
        </>
      );
    case 'windows':
      return (
        <>
          <path d="m42 72 24-4 1 16 15 4-1 5-32 4-17-6 1-5 11-3Z" fill="#7394aa" />
          <path d="m32 86 19 5 31-3m-31 3v5" fill="none" strokeWidth="1.8" />
          <path d="M11 24 70 9l27 8 5 5v43l-13 8-61 8-17-7Z" fill="#67748f" />
          <path d="m14 23 59-12 23 7-58 14Z" fill="#d2e3d9" strokeWidth="2" />
          <path d="m81 32 14-6v32l-13 9Z" fill="#48566f" strokeWidth="1.7" />
          <path d="m85 36 7-4m-7 10 7-4m-7 10 7-4" stroke="#a7b4bb" strokeWidth="1.8" />
          <path d="m9 27 65-14 6 4v47l-4 6-62 11-5-5Z" fill="#a6c5c2" />
          <path d="m13 29 59-12v46l-59 11Z" fill="#e0ebdb" strokeWidth="1.9" />
          <path d="m18 34 48-10v33l-48 10Z" fill="#183958" />
          <path d="m21 37 42-9v26l-42 9Z" fill="#2f839f" stroke="none" />
          <path d="m25 41 11-2v8l-11 2Zm14-3 15-3v8l-15 3Zm-14 14 11-2v7l-11 2Zm14-3 15-3v7l-15 3Z" fill="#94f5dc" stroke="none" />
          <path d="m57 63 5-1" stroke="#23886e" strokeWidth="2.5" />
          <path d="m62 78 32-5 12 6-1 5-34 7-13-7Z" fill="#8ba4b0" strokeWidth="2" />
          <path d="m63 80 30-5 9 4-32 7Z" fill="#deebd8" strokeWidth="1.3" />
          <path d="m69 80 18-3m-13 6 17-3" fill="none" stroke="#50788a" strokeWidth="1.5" />
        </>
      );
    case 'server':
      return (
        <>
          <path d="m16 17 22-13 56 7-23 16Z" fill="#a6b1d3" />
          <path d="m70 26 24-15v68L72 98Z" fill="#515878" />
          <path d="m77 30 11-8v45l-11 8Z" fill="#333b58" strokeWidth="1.7" />
          <path d="m80 38 5-4m-5 11 5-4m-5 11 5-4m-5 11 5-4" stroke="#8690ac" strokeWidth="1.8" />
          <path d="m16 17 56 8v73l-56-8Z" fill="#667997" />
          <path d="m20 22 48 7v61l-48-7Z" fill="#293751" strokeWidth="1.7" />
          {[28, 45, 62].map((y) => (
            <g key={y} transform={`translate(23 ${y}) skewY(8)`}>
              <rect width="41" height="13" rx="1.6" fill="#bec8cd" strokeWidth="2" />
              <path d="M4 4h8v6H4Z" fill="#576c81" strokeWidth="1" />
              <path d="M17 4h12m-12 4h9" stroke="#566c7f" strokeWidth="1.4" />
              <rect x="33" y="4" width="4.5" height="4.5" rx="1" fill="#6df1b6" strokeWidth="1" />
            </g>
          ))}
          <path d="m23 85 12 2m22 3 7 1" stroke="#f2ac65" strokeWidth="2" />
          <path d="m27 15 13-7 39 5" fill="none" stroke="#dce1e6" strokeWidth="2" />
          <path d="m21 92 7 1m31 4 7 1" strokeWidth="3" />
        </>
      );
    case 'tool':
      return (
        <>
          <path d="m19 59-1-32 6-5 58-8 10 7 2 29Z" fill="#df7548" />
          <path d="m30 24 1-7 20-4 4 5" fill="none" strokeWidth="4" />
          <path d="m24 30 59-9 3 25-60 10Z" fill="#783f41" strokeWidth="2" />
          <path d="m29 32 49-7m-47 11 35-5" stroke="#c37959" strokeWidth="1.6" />
          <path d="m14 61 20-12 49-8 17 9-19 18Z" fill="#f2a157" />
          <path d="m22 60 15-8 45-7 9 5-12 10-43 8Z" fill="#633f4a" strokeWidth="2" />
          <path d="m38 57 18-22c-4-7-1-14 5-16l2 8 6-1 2-6c6 7 1 17-7 17L49 62Z" fill="#b4dbd3" />
          <path d="m39 56 5-5 5 4-4 6Z" fill="#52a99f" strokeWidth="1.5" />
          <path d="m62 56 13-19 3 2-12 20Z" fill="#bdcfce" strokeWidth="1.6" />
          <path d="m73 38 5-11 4-2 4 3-1 4-7 10Z" fill="#fab650" strokeWidth="2" />
          <path d="m14 59 64 7 22-16-2 32-21 15-61-10Z" fill="#c3613f" />
          <path d="m14 59 64 7-1 31-61-10Z" fill="#f4a346" />
          <path d="m18 67 54 7v14l-54-7Z" fill="#e58a40" strokeWidth="1.5" />
          <path d="m81 70 13-9-1 13-12 9Z" fill="#9f5540" strokeWidth="1.6" />
          <path d="m25 63 7 1v8l-7-1Zm35 4 7 1v8l-7-1Z" fill="#e3dfba" strokeWidth="1.7" />
          <path d="m36 75 15 2v4l-15-2Z" fill="#594c53" strokeWidth="1.5" />
          <path d="m19 88 5 1m42 7 6 1" strokeWidth="3" />
        </>
      );
    case 'terminal':
      return (
        <>
          <path d="m14 57 5-36 8-6 55-5 13 9-5 43 9 9-1 13-21 12-65-10Z" fill="#4b8084" />
          <path d="m20 22 8-6 54-5 8 6-59 8Z" fill="#a4d2c1" strokeWidth="1.7" />
          <path d="m19 22 65-6 4 5-7 42-67-2Z" fill="#9cc9b8" />
          <path d="m25 28 53-5-4 32-54 1Z" fill="#28585a" />
          <path d="m29 31 44-4-4 23-45 2Z" fill="#173d43" strokeWidth="1.7" />
          <path d="m33 35 7 5-9 6m16-1 10-.7" fill="none" stroke="#94f5c7" strokeWidth="3" />
          <path d="m90 25-5 30m6-23-3 22" stroke="#355660" strokeWidth="2" />
          <path d="m15 59 64 3 12-5 8 13-22 15-67-9Z" fill="#aac4ad" />
          <path d="m10 76 67 9v12l-66-10Z" fill="#547d7d" />
          <path d="m77 85 22-15-1 13-21 14Z" fill="#33626a" />
          <path d="m21 65 43 1 7 6-5 4-46-5Z" fill="#375a66" strokeWidth="1.6" />
          <path d="m26 67 9 .5m4 .3 8 .3m5 .4 7 .3m-32 1.5 34 2" stroke="#a3bcb4" strokeWidth="1.6" />
          <path d="m78 68 6-3 4 4-6 4Z" fill="#ffb565" strokeWidth="1.5" />
          <path d="m17 81 7 1m3 .4 5 .6" stroke="#c7ded0" strokeWidth="2" />
        </>
      );
    case 'linux':
      return (
        <>
          <path d="m17 20 18-11 56 8v55l-18 14-56-8Z" fill="#7e75ab" />
          <path d="m17 20 18-11 56 8-18 12Z" fill="#d1bce5" />
          <path d="m17 20 56 9v56l-56-8Z" fill="#ab96c5" />
          <path d="m22 26 45 7v33l-45-6Z" fill="#4a4565" />
          <path d="m27 32 35 5v23l-35-5Z" fill="#2e4456" strokeWidth="1.5" />
          <path d="m32 38 6 6-6 4m11 2 9 1.5" fill="none" stroke="#a5f2cb" strokeWidth="3" />
          <path d="m26 69 12 2m5 1 5 .7" stroke="#625a81" strokeWidth="2" />
          <circle cx="60" cy="75" r="2.3" fill="#ffce86" strokeWidth="1.2" />
          <path d="m79 35 7-5m-7 11 7-5m-7 11 7-5" stroke="#514963" strokeWidth="2" />
          <path d="m27 80 18 3 3 5 35 3 11-8 6 3-2 8-16 5-41-5-5-6-10-2Z" fill="#cab9d2" strokeWidth="2" />
        </>
      );
    case 'network':
      return (
        <>
          <path d="m12 56 24-14 39 7 1 32-24 15-40-9Z" fill="#cf8850" />
          <path d="m12 56 24-14 39 7-24 15Z" fill="#ffd392" />
          <path d="m12 56 39 8 1 32-40-9Z" fill="#e9a963" />
          <path d="m24 59 11 2 23-14-11-2Z" fill="#f5d59c" strokeWidth="1.5" />
          <path d="m23 59 11 2v10l-11-2Z" fill="#f6d49c" strokeWidth="1.5" />
          <path d="m48 49 18-13 32 6v30L80 86l-32-6Z" fill="#bf7e4c" />
          <path d="m48 49 18-13 32 6-19 13Z" fill="#f4c78b" />
          <path d="m48 49 31 6 1 31-32-6Z" fill="#df9f67" />
          <path d="m28 24 19-13 38 6-1 31-19 13-37-6Z" fill="#cb8952" />
          <path d="m28 24 19-13 38 6-20 13Z" fill="#ffda9c" />
          <path d="m28 24 37 6v31l-37-6Z" fill="#efb772" />
          <path d="m40 26 9 2 20-13-10-2Z" fill="#e0f0c8" strokeWidth="1.5" />
          <path d="m40 26 9 2v11l-9-2Z" fill="#c2d4a9" strokeWidth="1.5" />
          <path d="m47 43 13 2v10l-13-2Z" fill="#fff0c9" strokeWidth="1.4" />
          <path d="m50 46 .1 4m3-3.5 .1 4m3-3.5 .1 4m-36 28 12 2" strokeWidth="1.3" />
        </>
      );
    case 'vm':
      return (
        <>
          <path d="m13 19 12-9 48 8v43l-12 10-48-8Z" fill="#707aac" />
          <path d="m13 19 12-9 48 8-12 10Z" fill="#c1c9f0" />
          <path d="m13 19 48 8v43l-48-7Z" fill="#94a5d7" />
          <path d="m20 27 34 5v25l-34-5Z" fill="#376589" strokeWidth="2" />
          <path d="m24 32 25 4v5l-25-4Z" fill="#9ee8dc" stroke="none" />
          <path d="m24 43 18 3" stroke="#6cb7bc" strokeWidth="2" />
          <path d="m41 45 12-9 48 8v42L89 97l-48-8Z" fill="#79679d" />
          <path d="m41 45 12-9 48 8-12 10Z" fill="#d3c2eb" />
          <path d="m41 45 48 8v44l-48-8Z" fill="#ad96cf" />
          <path d="m48 54 34 5v25l-34-5Z" fill="#554b7e" strokeWidth="2" />
          <path d="m52 59 25 4v5l-25-4Z" fill="#dbc7f4" stroke="none" />
          <path d="m52 70 15 2m-8 14 12 2" stroke="#bcacd8" strokeWidth="2" />
        </>
      );
    case 'docs':
      return (
        <>
          <path d="m20 25 51-13 14 8 1 64-54 14-13-8Z" fill="#507b83" />
          <path d="m20 25 51-13 12 6-52 14Z" fill="#94b0ac" />
          <path d="m24 26 49-12 3 63-49 14Z" fill="#d6caa9" />
          <path d="m29 28 50-13 5 64-51 15Z" fill="#fff0c9" />
          <path d="m39 23-1-6 8-2c-1-7 10-10 11-3l7-2 2 9Z" fill="#659692" strokeWidth="2.2" />
          <path d="m39 43 6-2 1 6-6 2Zm1 13 6-2 1 6-6 2Zm1 13 6-2 1 6-6 2Z" fill="#c8dcbd" strokeWidth="1.5" />
          <path d="m51 41 18-5m-17 17 19-5m-18 17 15-4" stroke="#79958f" strokeWidth="2" />
          <path d="m65 78 18-44 6 2-17 45-8 8Z" fill="#e9964f" />
          <path d="m83 34 2-5 5 2-1 5m-24 42 7 3-8 8Z" fill="#f0d09b" strokeWidth="1.8" />
        </>
      );
    case 'gem':
      return <path d="m55 8 23 21 7 27-31 39-30-38 7-29Z" fill="#74d6c7" />;
  }
}

type GearLibrary = 'loadout' | 'lab';

export function WorkshopSymbols({ library, kinds }: { library: GearLibrary; kinds: ItemKind[] }) {
  return (
    <svg className="workshop-symbols" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {kinds.map((kind) => (
          <symbol key={kind} id={`${library}-gear-${kind}`} viewBox="0 0 112 104">
            <g stroke="#28364a" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
              <EquipmentDrawing kind={kind} />
            </g>
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

export function WorkshopGear({ kind, library }: { kind: ItemKind; library: GearLibrary }) {
  return (
    <svg className="equipment-icon workshop-gear" viewBox="0 0 112 104" width="112" height="104" aria-hidden="true" focusable="false">
      <use href={`#${library}-gear-${kind}`} width="112" height="104" />
    </svg>
  );
}

function TerrainSymbols() {
  return (
    <defs>
      <linearGradient id="arena-sand" x2=".66" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#f2b780" /><stop offset=".52" stopColor="#f7c995" /><stop offset="1" stopColor="#e6a777" />
      </linearGradient>
      <linearGradient id="arena-relay-light" x2=".7" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#b7ffde" /><stop offset=".50" stopColor="#4ae6c6" /><stop offset="1" stopColor="#29acb8" />
      </linearGradient>
      <pattern id="arena-grit" width="97" height="75" patternUnits="userSpaceOnUse">
        <g fill="#a86456" opacity=".38">
          <path d="m12 22 4-1 2 2-5 1Zm55 37 5-2 4 2-6 2ZM36 69l3-1 2 2-4 1Z" />
          <circle cx="41" cy="18" r="1.2" /><circle cx="86" cy="38" r="1" />
        </g>
        <path d="m2 48 8-2 4 1m42-40 7-1" fill="none" stroke="#ffe1af" strokeWidth="1.5" opacity=".65" />
      </pattern>
      <g id="arena-outcrop" strokeLinejoin="round">
        <path d="m-3 33 11-19 23-8 29 4 16 18-6 15-38 7-28-7Z" fill="#8e6765" opacity=".46" />
        <path d="m1 20 9-15 24-8 22 5 13 17-4 17-19 8-32-4L1 31Z" fill="#686481" stroke="#49475e" strokeWidth="2.5" />
        <path d="m1 20 9-15 24-8 22 5 11 14-15 8-25 2-15-3Z" fill="#aaa4b5" />
        <path d="m1 20 12 3 14 3-3 12-11-2L1 30Z" fill="#847d98" />
        <path d="m27 26 25-2-3 13-6 5-18-3Z" fill="#8d88a8" />
        <path d="m10 5 24-7 21 5-13 1-14-1-14 7Z" fill="#d0bec3" />
        <path d="m54 5-7 6 4 4-9 3m20 5-5 3-3 8m-34-4-4-3" fill="none" stroke="#746c85" strokeWidth="1.8" />
      </g>
      <g id="arena-wall" strokeLinejoin="round">
        <path d="m0 31 48-1 13 12-8 7-54-2Z" fill="#93675d" opacity=".45" />
        <path d="m0 10 11-11 41 2 6 5-1 27-8 8-45-2-4-5Z" fill="#837796" stroke="#514963" strokeWidth="2.4" />
        <path d="m0 10 11-11 41 2 6 5-10 9-44-1Z" fill="#b6a8ba" />
        <path d="m5 14 43 1-1 18-6 4-34-1Z" fill="#9488a3" />
        <path d="m9 6 5-4 34 1m-41 13 32 1" fill="none" stroke="#d6bfc6" strokeWidth="2" />
        <path d="m33 15-4 5 4 3-2 5m19-6 4-4" fill="none" stroke="#736982" strokeWidth="1.7" />
      </g>
      <g id="arena-brush">
        <path d="M0 17 9 4l36-4 12 15-8 9-36 2Z" fill="#7c765e" opacity=".44" />
        <path d="m0 12 4-8 6 4-1-12 7 5 3-12 7 8 6-8 3 8 10-7 1 9 9-2-3 19-9 6-29-1Z" fill="#287b70" stroke="#366b65" strokeWidth="2" strokeLinejoin="round" />
        <path d="m4 7 8 7-1-12 8 8 3-15 5 15 7-16-1 15 12-9-4 14 10-7-5 10-11 5-22-2Z" fill="#40a78a" />
        <path d="m8 4 8 3-5-8Zm12-9 4-6 3 11Zm12 2 8-6-4 10Zm12 3 8-5-4 8Z" fill="#87d7a7" />
        <path d="m15 17 5 3m9-3 1-6m9 6 4-4" stroke="#248f7c" fill="none" strokeWidth="1.7" />
      </g>
      <g id="arena-agave" stroke="#376765" strokeWidth="1.35" strokeLinejoin="round">
        <path d="m1 6-16-4 11-3-7-13L1-5l4-17 4 17 13-8-7 12 13-1-12 8-8 2Z" fill="#51a58a" />
        <path d="M4 4 0-10 7 0l7-12-4 16Z" fill="#8cc999" stroke="none" />
      </g>
      <g id="arena-grate" stroke="#986f68" strokeLinejoin="round">
        <path d="m0 4 12-4 29 4-11 9-29-3Z" fill="#c59074" strokeWidth="1.7" />
        <path d="m7 6 8-3m0 5 8-4m0 5 8-4" fill="none" strokeWidth="2" />
      </g>
    </defs>
  );
}

function ArenaTerrain() {
  return (
    <>
      <TerrainSymbols />
      <path fill="url(#arena-sand)" d="M0 0h720v480H0z" />
      <g fill="#dba17e">
        <path d="M0 0h263l-15 42-51 21-22 32-67-4-40 35L0 118Zm720 0H471l15 44 48 11 32 36 52-4 40 43 62-7Z" />
        <path d="m0 220 61-11 39 35 27 4 14 28-15 32-52 15-41 39L0 350Zm720-8-56-1-34 36-52 24 13 36 56 17 36 44 37-12Z" />
        <path d="M0 411l65-18 48 15 26 31 59 13 25 28H0Zm720-11-54-9-45 16-36 35-62 16-17 22h214Z" />
      </g>
      <path d="m0 167 60 9 20 28 56 29 59 2 43-32 66-11 30 4 10-45 38-1 13 47 61 4 55 36 59-8 50-14 40-39 60-6v40l-42 6-42 40-67 24-79 7-55-36-41-1-3 44 49 34 10 49-43 17-14-43-51-35-50 40-12 46-46-15 15-57 49-38 3-41-39-1-47 33-80 7-65-34-37-30-41-9Z" fill="#ffdaa0" opacity=".65" />
      <path d="M0 0h720v480H0z" fill="url(#arena-grit)" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="m-6 145 36-9 24 8m133-39 22-3 20-19 28-4m218 10 25 5 18 18 18 2m108 78 24 10 30-8M63 373l18 7 18-4 23 8m447 9 21-6 13-10m-298 70 24-7 14 1 22-5" stroke="#bc8571" strokeWidth="2.4" />
        <path d="m234 145 14-6 8 2m191-15 10 4 17-3m-251 146 10-6 13 3m158 107 8 4 14-4" stroke="#fff0bd" strokeWidth="2.8" />
      </g>
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path id="arena-cable" d="m127 194 44 18h45l37-27h36l34 39h33m2-102v40l19 16v42m209-24-36 20h-39l-34-24h-34l-44 38h-25m-167 137 42-18 12-48 47-22 35-28m167 113-45-18-19-41-41-21-25-36" stroke="#bd896c" strokeWidth="8" />
        <use href="#arena-cable" stroke="#7b736d" strokeWidth="4.3" />
        <path d="m133 198 37 16h41m142-72v16m179 56h15l29-16m-362 159 27-12m226-6 24 10" stroke="#66b09e" strokeWidth="2" />
      </g>
      <use href="#arena-grate" x="223" y="212" /><use href="#arena-grate" x="431" y="264" />
      <use href="#arena-grate" x="442" y="117" transform="rotate(-8 442 117)" />
      <g>
        <use href="#arena-outcrop" transform="translate(-24 -2) scale(1.35)" />
        <use href="#arena-outcrop" transform="translate(37 -13) scale(1.5 1.15)" />
        <use href="#arena-outcrop" transform="translate(117 -9) scale(1.2)" />
        <use href="#arena-brush" transform="translate(148 28) scale(1.1)" />
        <use href="#arena-brush" transform="translate(192 22) scale(.8)" />
        <use href="#arena-wall" transform="translate(48 34)" /><use href="#arena-wall" transform="translate(-3 33)" />
        <use href="#arena-outcrop" transform="translate(-26 49) scale(.9)" />
        <use href="#arena-brush" transform="translate(11 75) scale(.85)" />
        <use href="#arena-agave" transform="translate(89 83) scale(.82)" />
        <use href="#arena-brush" transform="translate(272 -8) scale(.95)" />
        <use href="#arena-wall" transform="translate(416 -19)" />
        <use href="#arena-outcrop" transform="translate(495 -14) scale(1.1)" />
        <use href="#arena-outcrop" transform="translate(551 -20) scale(1.45)" />
        <use href="#arena-outcrop" transform="translate(627 -12) scale(1.55)" />
        <use href="#arena-brush" transform="translate(532 29) scale(.85)" />
        <use href="#arena-brush" transform="translate(576 33) scale(1.02)" />
        <use href="#arena-wall" transform="translate(640 33)" /><use href="#arena-wall" transform="translate(691 34)" />
        <use href="#arena-outcrop" transform="translate(682 62) scale(.85)" />
        <use href="#arena-agave" transform="translate(654 85) scale(.78)" />
      </g>
      <g>
        <use href="#arena-brush" transform="translate(192 104) scale(.84)" />
        <use href="#arena-wall" transform="translate(233 108) scale(.86)" />
        <use href="#arena-brush" transform="translate(438 142) scale(.8)" />
        <use href="#arena-wall" transform="translate(477 142) scale(.83)" />
        <use href="#arena-outcrop" transform="translate(-31 203) scale(1.1)" />
        <use href="#arena-outcrop" transform="translate(-6 235) scale(1.03)" />
        <use href="#arena-wall" transform="translate(42 260)" />
        <use href="#arena-brush" transform="translate(-12 276) scale(1.15)" />
        <use href="#arena-brush" transform="translate(27 291) scale(.95)" />
        <use href="#arena-agave" transform="translate(85 301) scale(.70)" />
        <use href="#arena-outcrop" transform="translate(686 204) scale(1.1)" />
        <use href="#arena-wall" transform="translate(655 241)" /><use href="#arena-wall" transform="translate(702 241)" />
        <use href="#arena-brush" transform="translate(631 280) scale(.90)" />
        <use href="#arena-brush" transform="translate(671 277) scale(1.15)" />
        <use href="#arena-agave" transform="translate(622 296) scale(.78)" />
        <use href="#arena-wall" transform="translate(256 266) scale(.82)" />
        <use href="#arena-brush" transform="translate(238 284) scale(.78)" />
        <use href="#arena-wall" transform="translate(422 276) scale(.82)" />
        <use href="#arena-agave" transform="translate(469 310) scale(.65)" />
      </g>
    </>
  );
}

function PowerRelay() {
  return (
    <g transform="translate(359 238)" strokeLinejoin="round" strokeLinecap="round">
      <path d="m-55 6 23-26 53-7 36 17 9 18-31 25-56 4-29-12Z" fill="#b78772" opacity=".7" />
      <g stroke="#424c62" strokeWidth="2.8">
        <path d="m-55-9 24-18 47-4 34 11 7 25-27 20-47 5-34-11Z" fill="#5a687d" />
        <path d="m-55-9 25-18 45-6 34 12 6 15-26 20-48 6-33-11Z" fill="#aab4ac" />
        <path d="m-46-9 20-13 41-5 26 10 4 9-21 15-42 5-25-8Z" fill="#475869" />
        <path d="m-35-8 15-9 34-5 19 8 5 7-17 11-35 4-19-6Z" fill="#294a55" strokeWidth="1.8" />
        <path d="m-49-3 14 6-3 7-13-5Zm67 18 20-8 3 4-19 10Z" fill="#f4bc69" strokeWidth="1.6" />
        <path d="m-4 11 18-2v12l-19 3Z" fill="#879d9c" strokeWidth="2" />
        <path d="m0 15 9-1" stroke="#83f6d7" strokeWidth="2.6" />
      </g>
      <g stroke="#347779" strokeWidth="2.2">
        <path d="m-26-19 4-15 11-4 6 25-9 12-9-6Z" fill="#4fb8ad" />
        <path d="m-22-34 5 6 6-10m-6 10 3 26" fill="none" stroke="#98e0be" strokeWidth="1.7" />
        <path d="m9-20 9-21 11 2 4 13-9 22-9 3Z" fill="#4cc4b5" />
        <path d="m18-41 2 14 9-12m-9 12-5 25" fill="none" stroke="#a9efc8" strokeWidth="1.7" />
        <path d="m-14-34 11-28 13 15 5 24L4-4l-13-8Z" fill="url(#arena-relay-light)" />
        <path d="m-14-34 11-28 1 31-7 19Z" fill="#a1f6d6" strokeWidth="1.4" />
        <path d="m-2-31 12-16 5 24L4-4Z" fill="#34bdb1" strokeWidth="1.5" />
        <path d="m-9-39 5-12" stroke="#e4ffe5" strokeWidth="2" />
      </g>
      <path d="m-23 19 8 3m43-32 5 2" stroke="#d4d6c5" strokeWidth="2.4" />
    </g>
  );
}

function Foreground() {
  return (
    <g>
      <use href="#arena-brush" transform="translate(-10 388) scale(1.26)" />
      <use href="#arena-brush" transform="translate(45 395) scale(.93)" />
      <use href="#arena-outcrop" transform="translate(-28 410) scale(1.7)" />
      <use href="#arena-outcrop" transform="translate(57 432) scale(1.23)" />
      <use href="#arena-wall" transform="translate(123 448)" />
      <use href="#arena-agave" transform="translate(130 434) scale(1.05)" />
      <use href="#arena-brush" transform="translate(162 462) scale(1.03)" />
      <use href="#arena-outcrop" transform="translate(279 465) scale(.95)" />
      <use href="#arena-brush" transform="translate(330 471)" />
      <use href="#arena-outcrop" transform="translate(393 472) scale(.83)" />
      <use href="#arena-brush" transform="translate(513 464) scale(.97)" />
      <use href="#arena-wall" transform="translate(552 454)" />
      <use href="#arena-outcrop" transform="translate(585 439) scale(1.17)" />
      <use href="#arena-outcrop" transform="translate(648 412) scale(1.55)" />
      <use href="#arena-brush" transform="translate(636 400) scale(1.10)" />
      <use href="#arena-brush" transform="translate(687 392) scale(1.15)" />
      <use href="#arena-agave" transform="translate(627 436) scale(1.09)" />
    </g>
  );
}

export default function ArenaScene({ label, selected }: { label: string; selected: StationObject }) {
  return (
    <svg className="arena-map" viewBox="0 0 720 480" width="720" height="480" role="img" aria-label={label}>
      <ArenaTerrain />
      <PowerRelay />
      {arenaStations.map((station) => (
        <g key={station.id} className="arena-node" data-active={selected === station.id} transform={`translate(${station.x} ${station.y})`}>
          <path d="m-54 24 22-16 54-3 37 13 6 15-20 18-58 4-37-13Z" fill="#9c746b" opacity=".46" />
          <path d="m-55 18 18-16 61-4 30 12v18L40 42l-60 5-35-12Z" fill="#7c747a" stroke="#635c69" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="m-55 18 20-16 59-5 30 13v12L38 36l-58 5-35-13Z" fill="#a39c9c" stroke="#625d6c" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="m-48 18 16-12 54-4 25 10v9L34 32l-53 4-29-10Z" fill="#bbb1a3" />
          <path d="m-43 26 11 4m63 0 10-5" stroke="#e3d6b8" strokeWidth="2" />
          <path className="arena-selection-ring" d="m-52 10 15-12 17-2m48-3 21 8 5 5m-6 19-13 12-19 2m-39 2-26-10-5-7" fill="none" stroke="#ffe075" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="3" cy="25" rx="42" ry="11" fill="#504b60" opacity=".36" />
          <g transform="translate(-62 -66)">
            <WorkshopGear kind={station.kind} library="lab" />
          </g>
        </g>
      ))}
      <Foreground />
    </svg>
  );
}
