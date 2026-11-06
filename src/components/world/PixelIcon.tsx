import type { ItemKind } from '../../content/world';

// Original 16 × 16 sprites. Shared palette keeps tools and project marks in one world.
const shapes: Record<ItemKind, string[]> = {
  pc: ['M4 1h8v14H4z', 'M5 2h6v2H5z M5 6h6v1H5z M5 8h6v1H5z', 'M9 12h2v1H9z'],
  tool: [
    'M9 1h4v2h2v4h-3V5h-2v4L5 14H2v-3l6-6V2z',
    'M3 11h2v2H3z',
    'M10 2h2v2h-2z',
  ],
  windows: [
    'M1 2l6-1v6H1z M9 1h6v6H9z M1 9h6v6l-6-1z M9 9h6v6H9z',
    'M3 3h3v2H3z M10 2h4v3h-4z',
    'M10 10h4v3h-4z',
  ],
  linux: [
    'M6 1h4v2h2v5l2 3v3H2v-3l2-3V3h2z',
    'M6 5h4v2h1v5H5V7h1z',
    'M6 3h1v1H6z M9 3h1v1H9z M7 5h2v1H7z M2 13h4v2H2z M10 13h4v2h-4z',
  ],
  server: [
    'M2 1h12v14H2z',
    'M3 2h10v3H3z M3 6h10v3H3z M3 10h10v3H3z',
    'M4 3h2v1H4z M4 7h2v1H4z M4 11h2v1H4z',
  ],
  network: [
    'M5 1h6v5H5z M1 10h5v5H1z M10 10h5v5h-5z M7 6h2v3h4v1H3V9h4z',
    'M6 2h4v3H6z M2 11h3v3H2z M11 11h3v3h-3z',
    'M7 3h2v1H7z',
  ],
  vm: ['M1 1h10v10H1z M5 5h10v10H5z', 'M2 2h8v2H2z M6 6h8v8H6z', 'M8 8h4v4H8z'],
  docs: [
    'M3 1h7l3 3v11H3z',
    'M5 5h6v1H5z M5 8h6v1H5z M5 11h4v1H5z',
    'M10 1v3h3z',
  ],
  terminal: [
    'M1 2h14v12H1z',
    'M2 3h12v10H2z',
    'M4 5h1v1h1v1H5v1H4V7h1V6H4z M8 9h4v1H8z',
  ],
  gem: ['M4 1h8l4 5-8 9L0 6z', 'M5 2h6l-3 4H2z', 'M8 6h6l-6 7z'],
};
export default function PixelIcon({
  kind,
  className = '',
}: {
  kind: ItemKind;
  className?: string;
}) {
  return (
    <svg
      className={`pixel-icon ${className}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {shapes[kind].map((d, i) => (
        <path key={i} d={d} fill={['#75996b', '#bed5ad', '#e6bb76'][i]} />
      ))}
    </svg>
  );
}
