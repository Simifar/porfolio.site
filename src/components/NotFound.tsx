import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../lib/context';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Broken graph visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" className="mx-auto opacity-40">
            <circle cx="20" cy="30" r="4" fill="var(--color-accent)" opacity="0.5" />
            <line x1="24" y1="30" x2="45" y2="30" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="30" r="4" fill="var(--color-text-muted)" opacity="0.3" />
            <line x1="54" y1="30" x2="65" y2="30" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            {/* Gap - broken connection */}
            <line x1="75" y1="30" x2="96" y2="30" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="30" r="4" fill="var(--color-accent)" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-7xl md:text-8xl font-bold tracking-[-0.03em] mb-4 text-[var(--color-text-muted)]"
        >
          {t.notFound.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[var(--color-text-secondary)] mb-8"
        >
          {t.notFound.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-full text-sm font-medium hover:opacity-90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.notFound.btn}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
