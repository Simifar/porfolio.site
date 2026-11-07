import { useId } from 'react';

// A bespoke repair-crew mascot, not a portrait or a character from a game.
export default function TechMascot({ label }: { label: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className="tech-mascot"
      viewBox="0 0 620 560"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={`${id}-hoodie`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#b196ff" />
          <stop offset="1" stopColor="#6e46d4" />
        </linearGradient>
        <linearGradient id={`${id}-case`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5bc9ff" />
          <stop offset="1" stopColor="#2585e7" />
        </linearGradient>
      </defs>
      <g
        className="mascot-orbit"
        fill="none"
        stroke="#fff"
        strokeOpacity=".14"
        strokeWidth="2"
      >
        <ellipse
          cx="316"
          cy="302"
          rx="242"
          ry="182"
          transform="rotate(-15 316 302)"
        />
        <ellipse
          cx="316"
          cy="302"
          rx="202"
          ry="223"
          transform="rotate(23 316 302)"
        />
      </g>
      <g fill="#b5a9ff" opacity=".6">
        <path d="m105 104 10 20 22 3-16 16 4 22-20-10-20 10 4-22-16-16 22-3Z" />
        <path d="m518 322 8 14 16 2-12 12 3 16-15-8-14 8 3-16-12-12 16-2Z" />
      </g>
      <g
        stroke="#11162c"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Oversized technician's pass floating behind the character. */}
        <g transform="rotate(12 479 202)">
          <path d="M451 149h82v111h-82z" fill="#ffcf4b" />
          <path d="M451 149h82v23h-82z" fill="#fff1a0" />
          <path
            d="M471 191h42M471 205h31M471 230h13"
            stroke="#bb7a25"
            strokeWidth="5"
          />
          <path d="M477 144v-8h28v8" fill="none" />
        </g>
        {/* Stage. */}
        <ellipse
          cx="313"
          cy="502"
          rx="201"
          ry="34"
          fill="#0e1530"
          stroke="none"
          opacity=".3"
        />
        <path d="M135 465q178-59 356 0v30q-178 67-356 0Z" fill="#3f4391" />
        <ellipse cx="313" cy="462" rx="178" ry="38" fill="#8291ff" />
        <ellipse
          cx="313"
          cy="462"
          rx="133"
          ry="23"
          fill="#b0baff"
          stroke="none"
        />
        {/* Stance and chunky work boots. */}
        <path
          d="m265 358-16 81 49 9 26-77m-4 1 19 73 52-12-24-81"
          fill="#223350"
        />
        <path d="m246 420 48 6 2 39q-31 17-75 1v-20Z" fill="#ffce51" />
        <path d="m339 425 45-11 26 26 10 22q-44 23-81 6Z" fill="#ffce51" />
        <path d="M226 453h66m56-2h56" stroke="#c18c27" strokeWidth="5" />
        <path d="m242 432 30 3m87 2 22-5" stroke="#fff0a4" strokeWidth="5" />
        {/* Hood and torso: a strong, original silhouette. */}
        <path
          d="M249 221q-31-42 10-80 43-30 88-1 51 37 18 88l27 118q-69 46-148 13l-8-83Z"
          fill="#5741a3"
        />
        <path
          d="M251 235q42-30 91-13l44 118q-68 50-145 15l-5-84Z"
          fill={`url(#${id}-hoodie)`}
        />
        <path d="m307 239 5 102" stroke="#d1c0ff" strokeWidth="5" />
        <path d="m271 302 9 35h60l7-35" fill="#7852c9" strokeWidth="4" />
        <path d="m273 248 5 20m62-21-4 20" stroke="#e2d5ff" strokeWidth="4" />
        {/* Left sleeve and glove support a miniature PC. */}
        <path d="M250 240q-28-14-47 15l-28 53 44 23 37-46" fill="#9270ed" />
        <path
          d="m184 293-20 22q-14 34 14 45 27 11 42-16l7-27Z"
          fill="#ffcf54"
        />
        <path d="m178 329 21 8" stroke="#d28e29" strokeWidth="5" />
        {/* Right raised arm with repair wrench. */}
        <path
          d="m350 240 25-11 39-39 29 31-36 55q-20 20-37 10"
          fill="#9270ed"
        />
        <path
          d="m407 192 7-17q5-15 25-7l23 18q15 19-5 34l-16 8Z"
          fill="#ffcf54"
        />
        <g transform="rotate(31 439 161)">
          <path
            d="M430 181v-48q-30-16-14-44l8 19h24l8-19q18 27-9 45v48Z"
            fill="#93e9e0"
          />
          <path d="M437 140v31" stroke="#d7fffa" strokeWidth="4" />
        </g>
        {/* Face and headset. Stylised fictional mascot, not an owner likeness. */}
        <path
          d="M261 150q-5-53 46-58 60-5 68 47l-11 56q-22 44-64 32-30-9-42-43Z"
          fill="#edb289"
        />
        <path
          d="m262 154 17-21q43 15 75-4l15 21 9-43-32-24-46 4-36 24Z"
          fill="#192b42"
        />
        <path d="m277 115 26-17 35 2" stroke="#3c5772" strokeWidth="7" />
        <path d="M266 153h50v37h-44Zm54 0h49l-8 37h-41Z" fill="#7df0d6" />
        <path d="M316 162h5" strokeWidth="5" />
        <path d="m277 159 11 18m45-18 10 18" stroke="#d6fff6" strokeWidth="5" />
        <path d="M305 206q12 8 26-2" fill="none" strokeWidth="4" />
        <path d="M255 144q-12 9-8 30l14 8 7-33Z" fill="#5a70cf" />
        <path
          d="M252 143q1-48 43-56"
          stroke="#abb8ff"
          strokeWidth="7"
          fill="none"
        />
        <path
          d="m251 173 8 28 23 7"
          fill="none"
          stroke="#364965"
          strokeWidth="5"
        />
        <path d="M281 206h10" stroke="#11162c" strokeWidth="8" />
        {/* Actual tech motif: the carried case has diagnostic lights, no game insignia. */}
        <g transform="rotate(-12 155 290)">
          <path d="M112 218h87l18 15v117h-105Z" fill={`url(#${id}-case)`} />
          <path d="m199 218 18 15v117h-18Z" fill="#1c62b5" />
          <path d="M127 234h54v19h-54Z" fill="#172e4f" />
          <path d="M137 243h32" stroke="#89e9c2" strokeWidth="4" />
          <circle cx="153" cy="288" r="21" fill="#192f55" />
          <path
            d="m142 277 22 22m0-22-22 22"
            stroke="#a2a3ff"
            strokeWidth="6"
          />
          <path d="M138 330h30" stroke="#c8f4ff" strokeWidth="5" />
        </g>
        <path d="m180 330 13 3q13 0 15-12" stroke="#ffcf54" strokeWidth="12" />
      </g>
      <g fill="#ffdf69">
        <path d="m83 326 7 17 18 6-18 7-7 18-6-18-18-7 18-6Z" />
        <path d="m459 66 6 13 14 5-14 6-6 14-5-14-14-6 14-5Z" />
      </g>
      <g stroke="#f8f0ff" strokeWidth="4" strokeLinecap="round">
        <path d="M528 108v15m-7-7h14M77 221v12m-6-6h12" />
      </g>
    </svg>
  );
}
