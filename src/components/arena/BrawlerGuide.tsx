import { useEffect, useRef, useState } from 'react';
import { brawlers, gameModes, guideCopy } from '../../content/brawlGuide';
import { useApp } from '../../lib/context';
import '../../styles/brawler-guide.css';

const artwork = import.meta.env.BASE_URL + 'brawl-guide/';

function BrawlerModel({ brawler, lang }: {
  brawler: (typeof brawlers)[number];
  lang: keyof typeof guideCopy;
}) {
  const [unavailable, setUnavailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const copy = guideCopy[lang];

  function showStill() {
    video.current?.pause();
    setPlaying(false);
  }

  function playAnimation() {
    const player = video.current;
    if (!player || !player.canPlayType('video/webm; codecs="vp9"')) {
      setVideoUnavailable(true);
      return;
    }
    // Assign the source inside the click so no clip is fetched while browsing.
    if (!player.getAttribute('src')) player.src = artwork + brawler.id + '.webm';
    player.currentTime = 0;
    setPlaying(true);
    player.play().catch((error: DOMException) => {
      if (error.name === 'AbortError') return;
      setPlaying(false);
      setVideoUnavailable(true);
    });
  }

  return (
    <div className="brawler-guide__stage">
      <div className="brawler-guide__stage-rim" aria-hidden="true" />
      <div className="brawler-guide__plinth" aria-hidden="true" />
      {unavailable ? (
        <span className="brawler-guide__missing" hidden={playing}>{copy.missingArt}</span>
      ) : (
        <img
          className="brawler-guide__model"
          src={artwork + brawler.id + '.webp'}
          width={brawler.posterWidth}
          height={420}
          alt={brawler.appearance[lang]}
          loading="lazy"
          decoding="async"
          draggable={false}
          hidden={playing}
          onError={() => setUnavailable(true)}
        />
      )}
      <video
        ref={video}
        className="brawler-guide__video"
        aria-label={brawler.name[lang] + ' — ' + brawler.appearance[lang]}
        width={brawler.posterWidth}
        height={420}
        hidden={!playing}
        controls
        muted
        playsInline
        preload="none"
        onEnded={showStill}
        onError={() => { setPlaying(false); setVideoUnavailable(true); }}
      />
      <div className="brawler-guide__player-control">
        {videoUnavailable ? (
          <span className="brawler-guide__player-message" role="status">{copy.missingVideo}</span>
        ) : (
          <button
            type="button"
            aria-label={(playing ? copy.still : copy.play) + ' — ' + brawler.name[lang]}
            onClick={playing ? showStill : playAnimation}
          >
            <span className={playing ? 'brawler-guide__stop' : 'brawler-guide__play'} aria-hidden="true" />
            {playing ? copy.still : copy.play}
          </button>
        )}
      </div>
    </div>
  );
}

export default function BrawlerGuide() {
  const { lang } = useApp();
  const [active, setActive] = useState(0);
  const [showArt, setShowArt] = useState(() => !('IntersectionObserver' in window));
  const cabinet = useRef<HTMLDivElement>(null);
  const brawler = brawlers[active];
  const copy = guideCopy[lang];

  useEffect(() => {
    if (showArt || !cabinet.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) setShowArt(true);
    }, { rootMargin: '80px' });
    observer.observe(cabinet.current);
    return () => observer.disconnect();
  }, [showArt]);

  return (
    <section id="brawlers" className="brawler-guide" aria-labelledby="brawler-guide-title">
      <div className="site-shell">
        <header className="brawler-guide__header">
          <div>
            <p className="brawler-guide__eyebrow">Brawl Stars</p>
            <h2 id="brawler-guide-title">{copy.title}</h2>
          </div>
          <p className="brawler-guide__intro">{copy.intro}</p>
        </header>

        <div className="brawler-guide__cabinet" data-brawler={brawler.id} ref={cabinet}>
          {showArt ? <BrawlerModel key={brawler.id} brawler={brawler} lang={lang} /> : <div className="brawler-guide__stage" aria-hidden="true" />}
          <fieldset className="brawler-guide__roster">
            <legend className="sr-only">{copy.roster}</legend>
            <div className="brawler-guide__choices">
              {brawlers.map((fighter, index) => (
                <label className="brawler-guide__choice" data-brawler={fighter.id} key={fighter.id}>
                  <input
                    type="radio"
                    name="brawler-roster"
                    value={fighter.id}
                    checked={active === index}
                    onChange={() => setActive(index)}
                    aria-controls="brawler-moves"
                  />
                  <span className="brawler-guide__tile">
                    <span className="brawler-guide__portrait">
                      {showArt && <img
                        src={artwork + fighter.id + '-portrait.webp'}
                        width={fighter.portraitSize[0]}
                        height={fighter.portraitSize[1]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />}
                    </span>
                    <span className="brawler-guide__tile-name">{fighter.name[lang]}</span>
                    <span className="brawler-guide__selected" aria-hidden="true" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div id="brawler-moves" className="brawler-guide__details" aria-live="polite" aria-atomic="true">
            <dl className="brawler-guide__traits">
              <div>
                <dt className="sr-only">{copy.class}</dt>
                <dd className="brawler-guide__class">{brawler.class[lang]}</dd>
              </div>
              <div>
                <dt className="sr-only">{copy.rarity}</dt>
                <dd className="brawler-guide__rarity">{brawler.rarity[lang]}</dd>
              </div>
            </dl>
            <h3>{brawler.name[lang]}</h3>
            <dl className="brawler-guide__moves">
              <div><dt>{copy.attack}</dt><dd>{brawler.attack[lang]}</dd></div>
              <div><dt>{copy.super}</dt><dd>{brawler.super[lang]}</dd></div>
            </dl>
          </div>
        </div>

        <div className="brawler-guide__modes-header">
          <h3 id="brawler-modes-title">{copy.modes}</h3>
          <a href={'https://supercell.com/brawlstars/' + lang + '/'} className="brawler-guide__source">
            {copy.source}<span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul className="brawler-guide__modes" aria-labelledby="brawler-modes-title">
          {gameModes.map((mode) => (
            <li key={mode.id}>
              <img src={artwork + mode.id + '.webp'} alt="" width={48} height={48} loading="lazy" decoding="async" />
              <div><h4>{mode.name[lang]}</h4><p>{mode.goal[lang]}</p></div>
            </li>
          ))}
        </ul>
        <p className="brawler-guide__notice">
          {copy.notice}{' '}
          <a href="https://supercell.com/en/fan-content-policy/">{copy.policy}</a>.
        </p>
      </div>
    </section>
  );
}
