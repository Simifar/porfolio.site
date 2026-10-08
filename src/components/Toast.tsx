import { useEffect, useState } from 'react';
import type { Content } from '../content/i18n';

export const EMAIL = 'Matafonovegor2@gmail.com';

type Listener = (message: string) => void;
const listeners = new Set<Listener>();

export function showToast(message: string) {
  for (const listener of listeners) listener(message);
}

export async function copyEmail(t: Content) {
  try {
    await navigator.clipboard.writeText(EMAIL);
    showToast(t.contact.copied);
  } catch {
    showToast(t.contact.copyFailed);
  }
}

// One polite live region for the whole app, so screen readers hear each
// confirmation once, wherever it was triggered.
export function ToastRegion() {
  const [toast, setToast] = useState<{ id: number; message: string; leaving: boolean } | null>(null);

  useEffect(() => {
    let leaveTimer = 0;
    let removeTimer = 0;
    const listener: Listener = message => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      setToast({ id: Date.now(), message, leaving: false });
      leaveTimer = window.setTimeout(() => setToast(current => current && { ...current, leaving: true }), 2400);
      removeTimer = window.setTimeout(() => setToast(null), 2640);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && <p key={toast.id} className={`toast${toast.leaving ? ' toast--leaving' : ''}`}>{toast.message}</p>}
    </div>
  );
}
