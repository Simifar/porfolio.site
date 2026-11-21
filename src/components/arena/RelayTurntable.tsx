import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, RotateCcw, RotateCw } from 'lucide-react';
import { useApp } from '../../lib/context';

const directory = `${import.meta.env.BASE_URL}figures/relay/`;
const frameCount = 8;
const frameUrl = (index: number) => `${directory}view-${index}.webp`;
const labels = {
  en: {
    region: 'Relay figurine', name: 'Relay', type: 'Workshop robot',
    alt: 'A cream CRT repair robot with a mint display and a tool pack.',
    left: 'Turn left', right: 'Turn right', angle: 'Viewing angle',
    download: 'Download 3D model (GLB)', error: 'This view could not load.',
  },
  ru: {
    region: 'Фигурка «Реле»', name: 'Реле', type: 'Робот мастерской',
    alt: 'Робот-техник со светлым корпусом, мятным экраном и инструментами.',
    left: 'Повернуть влево', right: 'Повернуть вправо', angle: 'Угол обзора',
    download: 'Скачать 3D-модель (GLB)', error: 'Не удалось загрузить этот ракурс.',
  },
};

export default function RelayTurntable() {
  const { lang } = useApp();
  const copy = labels[lang];
  const [frame, setFrame] = useState(0);
  const [hasError, setHasError] = useState(false);
  const requested = useRef(0);
  const requestId = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Keep the last decoded view visible during a turn, even on slow connections.
  useEffect(() => () => { requestId.current++; }, []);
  const turn = (step: number) => {
    const target = (requested.current + step + frameCount) % frameCount;
    const id = ++requestId.current;
    requested.current = target;
    const image = new Image();
    image.src = frameUrl(target);
    image.decode().then(() => {
      if (id !== requestId.current) return;
      setFrame(target);
      setHasError(false);
    }).catch(() => {
      if (id !== requestId.current) return;
      requested.current = frame;
      setHasError(true);
    });
  };

  return (
    <section className="hero-practice relay-viewer" aria-label={copy.region}>
      <div className="relay-stage"
        onPointerDown={event => {
          if (event.isPrimary && event.button === 0) touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={event => {
          const origin = touchStart.current;
          touchStart.current = null;
          if (!origin || !event.isPrimary) return;
          const distance = event.clientX - origin.x;
          if (Math.abs(distance) >= 28 && Math.abs(distance) > Math.abs(event.clientY - origin.y)) turn(distance > 0 ? 1 : -1);
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onPointerLeave={() => { touchStart.current = null; }}
      >
        <span className="relay-plinth" aria-hidden="true" />
        <img className="relay-figure" src={frameUrl(frame)} alt={copy.alt}
          width="640" height="640" fetchPriority={frame === 0 ? 'high' : 'auto'} draggable={false} onError={() => setHasError(true)} />
      </div>
      <div className="relay-console">
        <div className="relay-caption"><strong>{copy.name}</strong><span>{copy.type}</span></div>
        <div className="relay-controls" role="group" aria-label={copy.region}>
          <button type="button" onClick={() => turn(-1)} aria-label={copy.left} title={copy.left}><RotateCcw size={18} aria-hidden="true" /></button>
          <output aria-live="polite" aria-atomic="true"><span className="sr-only">{copy.angle} </span>{frame * 45}°</output>
          <button type="button" onClick={() => turn(1)} aria-label={copy.right} title={copy.right}><RotateCw size={18} aria-hidden="true" /></button>
          <a href={`${directory}relay.glb`} download aria-label={copy.download} title={copy.download}>
            <ArrowDownToLine size={15} aria-hidden="true" /> GLB
          </a>
        </div>
      </div>
      {hasError && <p className="relay-error" role="status">{copy.error}</p>}
    </section>
  );
}
