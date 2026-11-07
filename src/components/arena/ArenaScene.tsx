import EquipmentIcon from './EquipmentIcon';
import type { ItemKind } from '../../content/world';

export type StationObject =
  'pc' | 'monitor' | 'server' | 'toolkit' | 'terminal';
export const arenaStations: {
  id: StationObject;
  kind: ItemKind;
  x: number;
  y: number;
}[] = [
  { id: 'pc', kind: 'pc', x: 151, y: 170 },
  { id: 'monitor', kind: 'windows', x: 342, y: 107 },
  { id: 'server', kind: 'server', x: 549, y: 183 },
  { id: 'toolkit', kind: 'tool', x: 236, y: 329 },
  { id: 'terminal', kind: 'terminal', x: 471, y: 328 },
];
export default function ArenaScene({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: StationObject;
  onSelect?: (object: StationObject) => void;
}) {
  return (
    <svg
      className="arena-map"
      viewBox="0 0 720 480"
      role="img"
      aria-label={label}
    >
      <ellipse
        cx="362"
        cy="429"
        rx="302"
        ry="35"
        fill="#10172f"
        opacity=".16"
      />
      <g stroke="#131932" strokeWidth="6" strokeLinejoin="round">
        <path d="m57 137 328-98 282 208v60L337 451 57 224Z" fill="#4b428b" />
        <path d="m57 137 328-98 282 208-330 145Z" fill="#af9bff" />
        <path
          d="m81 139 300-74 255 179-294 122Z"
          fill="#ddd3ff"
          strokeWidth="3"
        />
        <g stroke="#ad9be5" strokeWidth="2">
          <path d="m144 124 258 216m-182-234 247 206m-174-228 237 199M129 198 439 102M197 254 510 152M265 310 580 202" />
        </g>
        <path
          d="m72 128 68-20v29l-68 23Zm477 96 102 14v35l-102-15Z"
          fill="#ffcb56"
        />
        <path
          d="m79 164 11 9v35l-11-8m540 86 25-10v27l-25 12"
          fill="#fff0ad"
          strokeWidth="3"
        />
        <path
          d="m326 395 25 18 57-24v18l-57 26-25-19Z"
          fill="#6c5cb1"
          strokeWidth="3"
        />
        <g fill="#76debd" strokeWidth="4">
          <path d="m73 279 36-10 25 18-36 13Z" />
          <path d="m600 350 30-10 24 15-30 13Z" />
        </g>
      </g>
      {arenaStations.map((station, i) => (
        <g
          key={station.id}
          className="arena-node"
          data-active={selected === station.id}
          onClick={onSelect ? () => onSelect(station.id) : undefined}
          transform={`translate(${station.x} ${station.y})`}
        >
          <ellipse
            cx="5"
            cy="33"
            rx="62"
            ry="23"
            fill="#342f65"
            opacity=".18"
          />
          <ellipse
            className="node-halo"
            cx="0"
            cy="22"
            rx="60"
            ry="31"
            fill="#8467d2"
            stroke="#292040"
            strokeWidth="4"
          />
          <g transform="translate(-33 -50)">
            <EquipmentIcon kind={station.kind} />
          </g>
          <path
            d="m-20 56 20-10 20 10-20 10Z"
            fill={selected === station.id ? '#ffcf56' : '#7864b5'}
          />
          <text
            x="-49"
            y="-21"
            fontSize="12"
            fontFamily="var(--font-display)"
            fill="#38295d"
            stroke="#ddd3ff"
            strokeWidth="4"
            paintOrder="stroke"
          >
            0{i + 1}
          </text>
        </g>
      ))}
      <g fill="#f8cb58" stroke="#312944" strokeWidth="3">
        <path d="m610 83 8 14 16 3-12 11 2 16-14-8-15 8 3-16-12-11 16-3Z" />
        <path d="m60 347 6 10 12 2-9 8 2 12-11-6-10 6 2-12-9-8 11-2Z" />
      </g>
    </svg>
  );
}
