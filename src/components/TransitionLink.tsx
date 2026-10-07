import { Link, useNavigate, type LinkProps } from 'react-router';
import { canUseViewTransition, navigateWithTransition } from '../lib/motion';

type TransitionLinkProps = Omit<LinkProps, 'to'> & { to: string };

// A router link that animates the page change. Modified clicks (new tab,
// new window) and browsers without View Transitions keep the default Link.
export default function TransitionLink({ to, onClick, ...props }: TransitionLinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      to={to}
      {...props}
      onClick={event => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!canUseViewTransition()) return;
        event.preventDefault();
        navigateWithTransition(() => navigate(to), event.currentTarget, to);
      }}
    />
  );
}
