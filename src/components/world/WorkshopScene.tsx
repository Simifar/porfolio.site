import { Fragment } from 'react';

export type StationObject =
  'pc' | 'monitor' | 'server' | 'toolkit' | 'terminal';
type Point = [number, number, number];
const point = ([x, y, z]: Point) =>
  `${350 + (x - y) * 23},${305 + (x + y) * 11.5 - z * 23}`;
const poly = (points: Point[]) => points.map(point).join(' ');
const palettes = {
  grass: ['#70944c', '#3d603b', '#4c713d'],
  dirt: ['#6b5140', '#483b31', '#564332'],
  wood: ['#b68c59', '#735037', '#8c643f'],
  metal: ['#74877c', '#293e37', '#42584a'],
  dark: ['#52695a', '#1b3029', '#30473b'],
  leaf: ['#86b652', '#456d37', '#628d3f'],
  light: ['#e6d4a7', '#9d9876', '#c1b08a'],
  blue: ['#84d6c2', '#376c61', '#4d9d88'],
} as const;
function Block({
  x,
  y,
  z,
  w = 1,
  d = 1,
  h = 1,
  material = 'wood',
}: {
  x: number;
  y: number;
  z: number;
  w?: number;
  d?: number;
  h?: number;
  material?: keyof typeof palettes;
}) {
  const c = palettes[material];
  return (
    <g
      stroke="#10251c"
      strokeOpacity=".16"
      strokeWidth=".65"
      strokeLinejoin="round"
    >
      <polygon
        points={poly([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={c[1]}
      />
      <polygon
        points={poly([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h],
        ])}
        fill={c[2]}
      />
      <polygon
        points={poly([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={c[0]}
      />
    </g>
  );
}
function Screen({
  x,
  y,
  z,
  terminal = false,
}: {
  x: number;
  y: number;
  z: number;
  terminal?: boolean;
}) {
  return (
    <g>
      <Block x={x + 1} y={y} z={z} w={0.5} d={0.6} h={0.7} material="metal" />
      <Block x={x} y={y} z={z + 0.6} w={3.3} d={0.3} h={2.1} material="dark" />
      <polygon
        points={poly([
          [x + 0.18, y + 0.31, z + 0.78],
          [x + 3.12, y + 0.31, z + 0.78],
          [x + 3.12, y + 0.31, z + 2.52],
          [x + 0.18, y + 0.31, z + 2.52],
        ])}
        fill="#0d2420"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${point([x + 0.4, y + 0.33, z + 2.2 - i * 0.32])} L${point([x + (terminal ? 1.2 + i * 0.36 : 2.5 - i * 0.28), y + 0.33, z + 2.2 - i * 0.32])}`}
          stroke={i === 0 ? '#a3db76' : '#55bda5'}
          strokeWidth={i === 0 ? 3 : 2}
        />
      ))}
      <polygon
        points={poly([
          [x + 0.3, y + 0.32, z + 2.7],
          [x + 3, y + 0.32, z + 2.7],
          [x + 3, y + 0.32, z + 2.75],
          [x + 0.3, y + 0.32, z + 2.75],
        ])}
        fill="#a2b596"
      />
    </g>
  );
}

// Original projection-based SVG, not an exported game asset. All facets are deterministic.
export default function WorkshopScene({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected?: StationObject;
  onSelect?: (object: StationObject) => void;
}) {
  const objectProps = (id: StationObject) => ({
    className: `scene-object${selected === id ? ' scene-object--selected' : ''}`,
    onClick: onSelect ? () => onSelect(id) : undefined,
  });
  return (
    <svg
      viewBox="0 35 720 480"
      className="workshop-scene"
      role="img"
      aria-label={label}
    >
      <ellipse
        cx="358"
        cy="471"
        rx="230"
        ry="31"
        fill="#06170e"
        opacity=".18"
      />
      {/* The island's earth, grass and inlaid workshop floor. */}
      <Block x={-6} y={-5} z={-1.7} w={12} d={10} h={1.7} material="dirt" />
      {/* Coplanar tiles share two surfaces and one grid, avoiding hidden inner faces. */}
      <Block x={-6} y={-5} z={0} w={12} d={10} h={0.24} material="grass" />
      <polygon
        points={poly([
          [-4, -5, 0.24],
          [5, -5, 0.24],
          [5, 3, 0.24],
          [-4, 3, 0.24],
        ])}
        fill={palettes.wood[0]}
      />
      <path
        d={[
          ...Array.from(
            { length: 13 },
            (_, i) => `M${point([i - 6, -5, 0.25])}L${point([i - 6, 5, 0.25])}`,
          ),
          ...Array.from(
            { length: 11 },
            (_, i) => `M${point([-6, i - 5, 0.25])}L${point([6, i - 5, 0.25])}`,
          ),
        ].join(' ')}
        stroke="#10251c"
        strokeOpacity=".18"
        strokeWidth=".8"
        fill="none"
      />
      {[-5, -3, -1, 1, 3, 5].map((x) => (
        <Block
          key={x}
          x={x}
          y={4.99}
          z={-0.9}
          w={0.5}
          d={0.04}
          h={0.3}
          material="wood"
        />
      ))}
      {/* Low back wall and perforated tool board. */}
      <Block x={-5} y={-5} z={0.24} w={10} d={0.32} h={5.3} material="dark" />
      <Block
        x={-4.6}
        y={-4.64}
        z={2.1}
        w={8.9}
        d={0.1}
        h={3.05}
        material="metal"
      />
      <path
        d={Array.from({ length: 4 }, (_, r) =>
          Array.from(
            { length: 17 },
            (_, col) =>
              `M${point([-4.35 + col * 0.5, -4.52, 2.4 + r * 0.65])}L${point([-4.24 + col * 0.5, -4.52, 2.4 + r * 0.65])}L${point([-4.24 + col * 0.5, -4.52, 2.51 + r * 0.65])}L${point([-4.35 + col * 0.5, -4.52, 2.51 + r * 0.65])}Z`,
          ).join(' '),
        ).join(' ')}
        fill="#243c31"
      />
      {/* Lit shelf and original block tools. */}
      <Block x={-4.8} y={-4.7} z={5.45} w={9.5} d={1} h={0.24} />
      <Block
        x={-4.3}
        y={-4.3}
        z={5.7}
        w={1.1}
        d={0.6}
        h={0.65}
        material="blue"
      />
      <Block
        x={2.9}
        y={-4.3}
        z={5.7}
        w={0.65}
        d={0.65}
        h={1}
        material="light"
      />
      <path
        d={`M${point([-3.5, -4.49, 3])}L${point([-3.5, -4.49, 4.4])}M${point([-3.9, -4.49, 4.3])}L${point([-3.1, -4.49, 4.3])}`}
        stroke="#d8c391"
        strokeWidth="7"
      />
      <path
        d={`M${point([3, -4.49, 3.1])}L${point([3, -4.49, 4.5])}`}
        stroke="#a4d4c1"
        strokeWidth="6"
      />
      {/* Rack, including three individual server drawers and status lights. */}
      <g {...objectProps('server')}>
        <Block
          x={3.9}
          y={-3.5}
          z={0.3}
          w={1.7}
          d={1.9}
          h={4.6}
          material="dark"
        />
        {[0, 1, 2, 3].map((i) => (
          <Fragment key={i}>
            <Block
              x={4.06}
              y={-1.58}
              z={0.65 + i}
              w={1.38}
              d={0.06}
              h={0.74}
              material="metal"
            />
            <polygon
              points={poly([
                [4.23, -1.51, 1 + i],
                [4.44, -1.51, 1 + i],
                [4.44, -1.51, 1.16 + i],
                [4.23, -1.51, 1.16 + i],
              ])}
              fill="#a4dc72"
            />
          </Fragment>
        ))}
      </g>
      {/* Workbench. */}
      {[-4, 2.6].map((x) => (
        <Fragment key={x}>
          <Block
            x={x}
            y={-3.3}
            z={0.24}
            w={0.45}
            d={0.5}
            h={2.3}
            material="dark"
          />
          <Block
            x={x}
            y={-0.8}
            z={0.24}
            w={0.45}
            d={0.5}
            h={2.3}
            material="dark"
          />
        </Fragment>
      ))}
      <Block x={-4.3} y={-3.8} z={2.5} w={7.6} d={3.6} h={0.35} />
      <g {...objectProps('monitor')}>
        <Screen x={-1.6} y={-3.1} z={2.85} />
      </g>
      {/* Keyboard and mouse, aligned to the tabletop. */}
      <Block
        x={-1.5}
        y={-1.5}
        z={2.86}
        w={2.5}
        d={0.8}
        h={0.12}
        material="dark"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <Block
          key={i}
          x={-1.35 + i * 0.27}
          y={-1.36}
          z={2.99}
          w={0.15}
          d={0.4}
          h={0.025}
          material="light"
        />
      ))}
      <Block
        x={1.4}
        y={-1.35}
        z={2.86}
        w={0.45}
        d={0.65}
        h={0.17}
        material="blue"
      />
      {/* Tower, visible on the left corner of the bench. */}
      <g {...objectProps('pc')}>
        <Block
          x={-4.05}
          y={-2.5}
          z={2.85}
          w={1.4}
          d={1.8}
          h={2.7}
          material="dark"
        />
        <polygon
          points={poly([
            [-3.91, -0.69, 3.15],
            [-2.8, -0.69, 3.15],
            [-2.8, -0.69, 5.3],
            [-3.91, -0.69, 5.3],
          ])}
          fill="#193a30"
        />
        {[3.7, 4.65].map((z) => (
          <g key={z}>
            <polygon
              points={poly([
                [-3.7, -0.68, z - 0.32],
                [-3.05, -0.68, z - 0.32],
                [-3.05, -0.68, z + 0.32],
                [-3.7, -0.68, z + 0.32],
              ])}
              fill="none"
              stroke="#7cac63"
              strokeWidth="3"
            />
            <path
              d={`M${point([-3.37, -0.67, z - 0.25])}L${point([-3.37, -0.67, z + 0.25])}`}
              stroke="#a6cb84"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>
      {/* Tool case and screwdriver on a low side bench. */}
      <g {...objectProps('toolkit')}>
        <Block x={-4.4} y={1.2} z={0.25} w={2.8} d={1.5} h={0.8} />
        <Block
          x={-4.2}
          y={1.4}
          z={1.05}
          w={1.55}
          d={1}
          h={0.7}
          material="blue"
        />
        <Block
          x={-3.85}
          y={1.6}
          z={1.75}
          w={0.7}
          d={0.3}
          h={0.2}
          material="dark"
        />
        <Block
          x={-2.35}
          y={1.45}
          z={1.05}
          w={0.25}
          d={0.8}
          h={0.12}
          material="light"
        />
      </g>
      {/* Laptop on the front-right service cart. */}
      <g {...objectProps('terminal')}>
        <Block
          x={1.4}
          y={1.5}
          z={0.25}
          w={2.7}
          d={1.8}
          h={0.4}
          material="dark"
        />
        <Screen x={1.55} y={1.55} z={0.65} terminal />
        <Block
          x={1.65}
          y={2.3}
          z={0.65}
          w={2.1}
          d={0.7}
          h={0.12}
          material="metal"
        />
      </g>
      {/* Small original sapling and grass tufts. */}
      <Block x={-5.5} y={2.5} z={0.24} w={0.45} d={0.5} h={2.2} />
      <Block x={-6.1} y={1.9} z={2.4} w={1.6} d={1.5} h={1.3} material="leaf" />
      <Block x={-5.8} y={2.1} z={3.7} w={1.1} d={1.1} h={0.7} material="leaf" />
      {[
        [5, 3.5],
        [-5, 3],
        [-2, 4.4],
        [4, -4],
      ].map(([x, y]) => (
        <g key={x} stroke="#b0ce70" strokeWidth="2">
          <path
            d={`M${point([x, y, 0.24])}L${point([x, y, 0.7])}M${point([x, y, 0.24])}L${point([x + 0.2, y, 0.55])}`}
          />
        </g>
      ))}
      {/* Copper ore embedded in the soil: no game textures. */}
      {[
        [-2, 5, -0.7],
        [2, 5, -1.1],
        [6, 1, -0.7],
      ].map(([x, y, z]) => (
        <Block
          key={x}
          x={x}
          y={y}
          z={z}
          w={0.28}
          d={0.08}
          h={0.22}
          material="light"
        />
      ))}
    </svg>
  );
}
