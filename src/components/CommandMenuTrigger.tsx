import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../lib/context';

// The menu itself loads lazily; the trigger and the open signal stay in the
// main bundle. A request made before the menu loads is kept and honoured.
export const OPEN_EVENT = 'command-menu:open';
let pendingOpen = false;

export function openCommandMenu() {
  pendingOpen = true;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function takePendingOpen() {
  const pending = pendingOpen;
  pendingOpen = false;
  return pending;
}

export function CommandMenuTrigger() {
  const { t } = useApp();
  const [shortcut, setShortcut] = useState('Ctrl K');
  useEffect(() => setShortcut(/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K'), []);

  return (
    <button type="button" className="command-trigger" onClick={openCommandMenu} aria-label={t.command.open} aria-keyshortcuts="Control+K Meta+K">
      <Search size={15} aria-hidden="true" />
      <kbd className="command-trigger__kbd" aria-hidden="true">{shortcut}</kbd>
    </button>
  );
}
