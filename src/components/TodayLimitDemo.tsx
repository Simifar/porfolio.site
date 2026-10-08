import { ArrowRight, RotateCcw, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../lib/context';
import { prefersReducedMotion } from '../lib/motion';

const LIMIT = 5;
const START_TODAY = [0, 1, 2, 3];
const START_INBOX = [4, 5, 6];

// MOCK: an interactive model of TaskFocus's five-task rule with sample tasks
// from t.demo.tasks. It is not the TaskFocus app, and the UI says so.
export default function TodayLimitDemo() {
  const { t } = useApp();
  const [today, setToday] = useState(START_TODAY);
  const [inbox, setInbox] = useState(START_INBOX);
  const [blocked, setBlocked] = useState<number | null>(null);
  // A moved task's button disappears, so focus moves to its neighbour.
  const [focusAfter, setFocusAfter] = useState<{ list: 'inbox' | 'today'; index: number } | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const todayColumn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focusAfter || !board.current) return;
    const buttons = board.current.querySelectorAll<HTMLButtonElement>(`[data-list="${focusAfter.list}"] button`);
    const fallback = board.current.querySelectorAll<HTMLButtonElement>('button');
    (buttons[Math.min(focusAfter.index, buttons.length - 1)] ?? fallback[0])?.focus();
    setFocusAfter(null);
  }, [focusAfter]);
  const touched = today.length !== START_TODAY.length || inbox.length !== START_INBOX.length || blocked !== null;
  const name = (task: number) => t.demo.tasks[task];

  const plan = (task: number) => {
    if (today.length >= LIMIT) {
      setBlocked(task);
      if (!prefersReducedMotion()) {
        todayColumn.current?.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }],
          { duration: 360, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      }
      return;
    }
    setBlocked(null);
    setFocusAfter({ list: 'inbox', index: inbox.indexOf(task) });
    setInbox(list => list.filter(item => item !== task));
    setToday(list => [...list, task]);
  };

  const unplan = (task: number) => {
    setBlocked(null);
    setFocusAfter({ list: 'today', index: today.indexOf(task) });
    setToday(list => list.filter(item => item !== task));
    setInbox(list => [task, ...list]);
  };

  const reset = () => {
    setBlocked(null);
    setToday(START_TODAY);
    setInbox(START_INBOX);
  };

  return (
    <section className="limit-demo" aria-labelledby="limit-demo-title">
      <div className="limit-demo__header">
        <h3 id="limit-demo-title" className="limit-demo__title">{t.demo.title}</h3>
        <p className="limit-demo__intro">{t.demo.intro}</p>
        <p className="limit-demo__disclosure">{t.demo.disclosure}</p>
      </div>

      <div ref={board} className="limit-demo__board">
        <div className="limit-demo__column">
          <h4 className="limit-demo__column-title">
            {t.demo.inbox}
            <span className="limit-demo__count">{inbox.length}</span>
          </h4>
          <ul className="limit-demo__list" data-list="inbox">
            {inbox.map(task => (
              <li key={task} className="limit-demo__task">
                <span>{name(task)}</span>
                <button type="button" className="limit-demo__action" onClick={() => plan(task)} aria-label={t.demo.move.replace('{task}', name(task))}>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          {inbox.length === 0 && <p className="limit-demo__empty">{t.demo.inboxEmpty}</p>}
        </div>

        <div
          ref={todayColumn}
          className={`limit-demo__column limit-demo__column--today${blocked !== null ? ' limit-demo__column--blocked' : ''}`}
        >
          <h4 className="limit-demo__column-title">
            {t.demo.today}
            <span className="limit-demo__slots-label">{t.demo.slots.replace('{count}', String(today.length))}</span>
          </h4>
          <div className="limit-demo__meter" aria-hidden="true">
            {Array.from({ length: LIMIT }, (_, index) => (
              <span key={index} className={`limit-demo__slot${index < today.length ? ' limit-demo__slot--filled' : ''}`} />
            ))}
          </div>
          <ul className="limit-demo__list" data-list="today">
            {today.map(task => (
              <li key={task} className="limit-demo__task limit-demo__task--today">
                <span>{name(task)}</span>
                <button type="button" className="limit-demo__action" onClick={() => unplan(task)} aria-label={t.demo.unplan.replace('{task}', name(task))}>
                  <Undo2 size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
            {Array.from({ length: LIMIT - today.length }, (_, index) => (
              <li key={`free-${index}`} className="limit-demo__free" aria-hidden="true" />
            ))}
          </ul>
        </div>
      </div>

      <div className="limit-demo__footer">
        <p className="limit-demo__message" role="status" aria-live="polite">
          {blocked !== null ? t.demo.blocked.replace('{task}', name(blocked)) : ''}
        </p>
        {touched && (
          <button type="button" className="limit-demo__reset" onClick={reset}>
            <RotateCcw size={14} aria-hidden="true" />
            {t.demo.reset}
          </button>
        )}
      </div>
    </section>
  );
}
