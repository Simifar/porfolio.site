import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../lib/context';

export default function NotFound() {
  const { t } = useApp();

  return (
    <main className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__code">{t.notFound.title}</h1>
        <p className="not-found__text">{t.notFound.text}</p>
        <Link to="/" className="button-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          {t.notFound.btn}
        </Link>
      </div>
    </main>
  );
}
