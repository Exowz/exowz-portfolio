'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMapPin,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react';
import { StatefulButton } from '@/components/ui/stateful-button';

const CONTACT_EMAIL = 'contact@mke-kapoor.com';

export function ContactWindow() {
  const t = useTranslations('pages.contact');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [renderedAt] = useState(() => Date.now());
  const [company, setCompany] = useState(''); // honeypot — real users leave empty

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company, renderedAt }),
      });
      if (!response.ok) throw new Error('failed');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const chips: Array<{ icon: typeof IconMail; label: string; href?: string }> = [
    { icon: IconMail, label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: IconBrandLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mke-kapoor' },
    { icon: IconBrandGithub, label: 'GitHub', href: 'https://github.com/exowz' },
    { icon: IconMapPin, label: t('location') },
  ];

  const inputClass =
    'w-full rounded-xl border bg-[var(--field-bg)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors border-[var(--field-border)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-text)] disabled:opacity-60';

  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-2xl"
      >
        {/* Centered header */}
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--accent-text)' }}>
            {t('title')}
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl" style={{ color: 'var(--foreground)' }}>
            {t('description')}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
          <span
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
            style={{
              color: 'var(--accent-text)',
              background: 'color-mix(in srgb, var(--accent-text) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent-text) 34%, transparent)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping"
                style={{ background: 'var(--accent-text)' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: 'var(--accent-text)' }}
              />
            </span>
            {t('availability')}
          </span>
        </header>

        {/* Contact chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {chips.map(({ icon: Icon, label, href }) => {
            const inner = (
              <>
                <Icon className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />
                {label}
              </>
            );
            const className =
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-opacity hover:opacity-80';
            const style = {
              background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
              border: '1px solid var(--window-border)',
              color: 'var(--foreground)',
            } as const;
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={className}
                style={style}
              >
                {inner}
              </a>
            ) : (
              <span key={label} className={className} style={style}>
                {inner}
              </span>
            );
          })}
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="glass-card mx-auto mt-8 max-w-lg space-y-4 rounded-2xl p-6"
          style={{ background: 'var(--window-bg)' }}
        >
          {/* Honeypot: hidden from humans, bots tend to fill it */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {t('labels.name')}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {t('labels.email')}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              required
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {t('labels.message')}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className={`${inputClass} resize-none`}
              required
              disabled={status === 'loading'}
            />
          </div>

          {status === 'success' && (
            <div
              className="flex items-center gap-2 rounded-xl p-3.5 text-sm font-medium"
              style={{ background: 'rgba(54,210,122,0.1)', border: '1px solid rgba(54,210,122,0.25)', color: '#1f9d57' }}
            >
              <IconCircleCheck className="h-5 w-5 shrink-0" />
              {t('status.success')}
            </div>
          )}
          {status === 'error' && (
            <div
              className="flex items-center gap-2 rounded-xl p-3.5 text-sm font-medium"
              style={{ background: 'rgba(239,83,80,0.1)', border: '1px solid rgba(239,83,80,0.25)', color: '#e53935' }}
            >
              <IconCircleX className="h-5 w-5 shrink-0" />
              {t('status.error')}
            </div>
          )}

          <StatefulButton
            type="submit"
            status={status}
            className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50"
            style={{ background: 'var(--accent-solid)', boxShadow: '0 2px 12px color-mix(in srgb, var(--accent) 40%, transparent)' }}
          >
            {t('submit')}
          </StatefulButton>
        </form>
      </motion.div>
    </div>
  );
}
