'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface PrincipleItem {
  title: string;
  body: string;
}

export function PrinciplesWindow() {
  const t = useTranslations('principles');
  const items = t.raw('items') as PrincipleItem[];

  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl space-y-8"
      >
        <p className="text-lg md:text-xl text-foreground/80">{t('intro')}</p>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-accent/20 bg-card/60 p-5 md:p-6">
              <h2 className="mb-2 text-xl md:text-2xl font-semibold text-accent">{item.title}</h2>
              <p className="leading-relaxed text-foreground/80">{item.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
