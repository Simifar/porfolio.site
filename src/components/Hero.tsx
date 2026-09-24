import { ArrowDown, Mail } from 'lucide-react';
import { useApp } from '../lib/context';

export default function Hero() {
  const { t } = useApp();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center px-5 pb-14 pt-28 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="relative z-10">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Egor Matafonov · Product Manager
          </p>

          <h1 className="max-w-[18ch] text-[clamp(2.5rem,4.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            {t.hero.headline}
            <span className="mt-2 block text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.06] text-[var(--color-accent)]">{t.hero.headlineAccent}</span>
          </h1>

          <p className="mt-7 max-w-[42rem] text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            {t.hero.supporting}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('work')?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              })}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-on-accent)] transition-opacity hover:opacity-90"
            >
              {t.hero.cta}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              })}
              className="inline-flex min-h-12 items-center gap-2 px-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t.hero.contactLink}
            </button>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[600px]">
          <div className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <img
              src={import.meta.env.BASE_URL + 'projects/mindtrack-home.png'}
              alt={t.hero.visualAlt}
              width={1280}
              height={1306}
              loading="eager"
              decoding="async"
              className="block aspect-square w-full object-cover object-top"
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 px-1">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{t.hero.visualTitle}</span>
            <span className="text-xs text-[var(--color-text-muted)]">{t.hero.visualSubtitle}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
