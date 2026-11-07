import type { ItemKind } from '../../content/world';

// Original gadget illustrations. Bold silhouettes remain legible on touch cards.
export default function EquipmentIcon({
  kind,
  className = '',
}: {
  kind: ItemKind;
  className?: string;
}) {
  return (
    <svg
      className={`equipment-icon ${className}`}
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      fill="none"
      stroke="#101426"
      strokeWidth="3.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {kind === 'pc' && (
        <>
          <path d="M14 7h32l5 5v45H14z" fill="#58bfff" />
          <path d="M14 7h25v50H14z" fill="#d4f1ff" />
          <path d="M21 15h11M21 21h11" />
          <circle cx="27" cy="36" r="7" fill="#7665e8" />
          <path d="m23 32 8 8m0-8-8 8" strokeWidth="2" />
          <path d="M23 49h8" stroke="#1354b5" />
        </>
      )}
      {kind === 'tool' && (
        <>
          <path
            d="m36 7 5 10 10-1 3-9c8 12 1 25-11 25L25 53c-8 8-20-3-12-11l20-19C28 17 29 10 36 7Z"
            fill="#79e2d1"
          />
          <circle cx="20" cy="47" r="2" fill="#fff" strokeWidth="2" />
          <path d="m27 37 9-10" stroke="#fff" strokeWidth="3" />
        </>
      )}
      {kind === 'windows' && (
        <>
          <path
            d="M5 13 29 8v22H5Zm30-6 24-4v27H35ZM5 36h24v22L5 53Zm30 0h24v25l-24-3Z"
            fill="#50c6ff"
          />
          <path d="M11 17h11M41 14h11" stroke="#c5f5ff" strokeWidth="3" />
        </>
      )}
      {kind === 'linux' && (
        <>
          <path d="M13 12h38v40H13z" fill="#b6a4ff" />
          <path d="M18 17h28v25H18z" fill="#192c55" />
          <path d="m23 24 6 5-6 5m11 2h7" stroke="#92f7d1" />
          <path d="M22 52v5m20-5v5M18 57h28" />
        </>
      )}
      {kind === 'server' && (
        <>
          <path d="M11 5h42v54H11z" fill="#475eaa" />
          {[10, 26, 42].map((y) => (
            <g key={y}>
              <path d={`M16 ${y}h32v11H16z`} fill="#c5caff" />
              <path d={`M21 ${y + 5}h2`} stroke="#35b88c" strokeWidth="4" />
              <path d={`M32 ${y + 5}h10`} stroke="#52619a" strokeWidth="2" />
            </g>
          ))}
        </>
      )}
      {kind === 'network' && (
        <>
          <path d="M8 20h48v35H8z" fill="#ffcb56" />
          <path d="M8 20 20 9h24l12 11" fill="#ffe79d" />
          <path d="M27 20h10v35H27z" fill="#f48d4d" />
          <path d="M18 44h5" stroke="#fff2b2" />
          <path d="m27 20 3-11h7v11" strokeWidth="2" />
        </>
      )}
      {kind === 'vm' && (
        <>
          <path d="M5 8h37v32H5z" fill="#ff9cb9" />
          <path d="M21 24h38v32H21z" fill="#b6a0ff" />
          <path d="M27 30h26v17H27z" fill="#e4dcff" />
          <path d="M12 15h21" stroke="#ffe4ee" />
          <path d="M34 51h12" strokeWidth="2" />
        </>
      )}
      {kind === 'docs' && (
        <>
          <path d="M14 5h25l12 12v42H14z" fill="#fff0b0" />
          <path d="M39 5v13h12" fill="#ffcb56" />
          <path d="M23 28h19M23 36h19M23 44h13" stroke="#aa6b35" />
          <path d="M10 9v46" stroke="#ffbb50" strokeWidth="3" />
        </>
      )}
      {kind === 'terminal' && (
        <>
          <path d="M6 11h52v40H6z" fill="#7ce3c7" />
          <path d="M11 16h42v29H11z" fill="#183e46" />
          <path d="m18 23 7 6-7 6m14 2h12" stroke="#afffdc" />
          <path d="M26 51v6m12-6v6M19 57h26" />
        </>
      )}
      {kind === 'gem' && (
        <>
          <path d="m15 9 34 0 10 17-27 33L5 26Z" fill="#b2a0ff" />
          <path
            d="m15 9 9 17 8-17 8 17 9-17M5 26h54M24 26l8 33 8-33"
            stroke="#6550b4"
            strokeWidth="2.5"
          />
          <path d="m16 14-5 9h9" stroke="#efe9ff" strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
