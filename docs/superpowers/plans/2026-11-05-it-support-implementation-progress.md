# Implementation ledger

Plan: 2026-11-05-it-support-portfolio-handoff.md

- Base verified: origin/master 8718a7252b2dd9f5426ea8b241ffabf60ecebba2. Working branch codex/it-support-portfolio. Existing untracked audit files preserved.
- Ruling: use the in-place branch explicitly allowed by the handoff; no extra worktree or commits.
- Ruling: latest user explicitly declined a detailed repair incident. Use a concise factual practice example, without invented fault, diagnosis or verification steps.
- User confirmed 2026-11-05: rebuilt PCs, repaired power supplies, lubricated fans, worked with 1C databases and Windows Server. Seeking remote work or office/hybrid in Yekaterinburg. No specific remote support tools or administrative duties were confirmed.
- Older Drive resume found, dated September 2026, targeting lead generation. Do not restore superseded roles/dates or publish its B1 language level without current confirmation.
- Shared interfaces: i18n text is consumed by hero/navigation/contact; projects.ts is consumed by SPA and static page generator; PDF links use Vite BASE_URL.
- Verification: existing suite baseline started before changes; new regression tests cover CTA/order and real PDF responses. Visual content changes use rendering and manual review rather than tests duplicating copy.

## Completed deliverables

- [x] Task 1: new typographic 1200x630 OG image; initial, SPA and fallback static metadata reference `og-image.png?v=20261105`; no PM positioning in the preview. Live page still references the earlier unversioned image because this work is not published.
- [x] Task 2, with user's revised scope: expanded Potencial work with confirmed 1C / Windows Server exposure; concise real maintenance practice block instead of a detailed fault narrative.
- [x] Task 3: technical hero panel replaces TaskFocus cover, main CTA leads to experience, skills before software projects; navigation says Skills / Навыки. Practical work and subjects being learned remain distinct.
- [x] Task 4: O!task and Web Do compacted, with historical job titles preserved. Documentation, role guide, knowledge base, client communication and reusable document templates retained.
- [x] Task 5: confirmed work format on home and case pages; genuine one-page English/Russian PDF resumes with embedded fonts and six clickable links each. Technical TaskFocus details sourced from local/public HEAD f3f4a0cf01d8f9c17cd1aa8373faf26bcbabcc3f; remote HEAD verified equal. AI assistance and lack of fresh authenticated-flow verification remain explicit.

## Verification evidence

- Baseline before changes: typecheck passed; existing 26 E2E tests passed (output/baseline-e2e.log).
- New regressions first failed for the old work CTA and missing resume links (output/technical-red.log).
- Final typecheck passed. Final E2E suite: 28 passed, 59.3s (output/final-e2e.log). Includes language/theme persistence, keyboard/skip navigation, 320/390px layouts, all case routes, static pages, reduced motion and sampled WCAG axe checks.
- Lighthouse: all configured assertions passed, three URLs / six runs. Performance 95-100; accessibility, best practices and SEO 100. Lab measurements, not real-user metrics (output/final-lighthouse.log, .lighthouseci/reports/manifest.json).
- Production build with PAGES_BASE_PATH=/porfolio.site succeeded; previous process environment restored. Preview at http://127.0.0.1:4174/porfolio.site/.
- Production base verification: 28 scenarios passed; homepage at 320/390/768/1440 in EN/RU and both themes; three SPA + static cases in EN/RU at 320/1440. No page errors or horizontal overflow; images, PDF signatures/paths, OG dimensions and metadata verified (output/production-base-results.json).
- Both current PDF files rendered and visually inspected. One page each, legible Cyrillic, six link annotations each. Current renders: output/egor-matafonov-ru.png and -en.png.
- Screenshots visually inspected: output/playwright/support-home-ru-1440-dark.png, support-home-ru-320-dark.png, support-home-ru-390-light.png, support-experience-ru.png. Final git diff --check clean.
- Independent read-only final review: no important correctness or truthfulness findings. Minor (deferred): unused CSS selectors for the removed hero image remain; no functional effect, avoid broad shared-selector cleanup in this task.
- Review boundaries resolved: detailed incident waived by user; responsive/base checks completed by implementer; current PDFs freshly rasterized with bundled pypdfium2 and parsed with pypdf; messenger cache and TaskFocus authenticated behavior are not claimed as verified.

No commit, push, merge, deployment or service-setting mutation performed. Work remains on codex/it-support-portfolio. Existing untracked audit artifacts preserved.
