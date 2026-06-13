'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Command } from 'cmdk';
import {
  IconAdjustmentsHorizontal,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconFolder,
  IconHome,
  IconMail,
  IconMoon,
  IconRefresh,
  IconSearch,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { languageOptions } from '@/components/header/language-types';

interface CommandPaletteContextValue {
  open: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  }
  return context;
}

function replayIntro() {
  localStorage.removeItem('hasSeenBoot');
  window.location.reload();
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const tNav = useTranslations('nav');
  const tProjects = useTranslations('projects');
  const tSettings = useTranslations('settings');
  const tCommand = useTranslations('commandPalette');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const contextValue = useMemo<CommandPaletteContextValue>(() => ({
    open: () => setOpen(true),
  }), []);

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {children}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={tCommand('title')}
        overlayClassName="fixed inset-0 z-[99] bg-black/20 backdrop-blur-md"
        className="fixed left-1/2 top-[14vh] z-[100] w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-3xl border"
        style={{
          background: 'var(--window-bg)',
          borderColor: 'var(--window-border)',
          boxShadow: 'var(--window-shadow)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--window-border)' }}>
          <IconSearch className="h-4 w-4 shrink-0" style={{ color: 'var(--text-secondary)' }} />
          <Command.Input
            placeholder={tCommand('placeholder')}
            className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            style={{ color: 'var(--foreground)' }}
          />
          <kbd className="rounded-md border px-1.5 py-0.5 text-[10px]" style={{ color: 'var(--text-secondary)', borderColor: 'var(--window-border)' }}>
            esc
          </kbd>
        </div>

        <Command.List className="max-h-[24rem] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            {tCommand('empty')}
          </Command.Empty>

          <Command.Group heading={tCommand('navigation')} className="px-1 py-1 text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            <PaletteItem icon={<IconHome />} value={tNav('home')} onSelect={() => run(() => router.push('/'))}>
              {tNav('home')}
            </PaletteItem>
            <PaletteItem icon={<IconFolder />} value={tNav('projects')} onSelect={() => run(() => router.push('/projects'))}>
              {tNav('projects')}
            </PaletteItem>
            <PaletteItem icon={<IconUser />} value={tNav('about')} onSelect={() => run(() => router.push('/about'))}>
              {tNav('about')}
            </PaletteItem>
            <PaletteItem icon={<IconMail />} value={tNav('contact')} onSelect={() => run(() => router.push('/contact'))}>
              {tNav('contact')}
            </PaletteItem>
            <PaletteItem icon={<IconAdjustmentsHorizontal />} value={tNav('settings')} onSelect={() => run(() => router.push('/settings'))}>
              {tNav('settings')}
            </PaletteItem>
          </Command.Group>

          <Command.Group heading={tCommand('projects')} className="px-1 py-1 text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            {projects.map((project) => (
              <PaletteItem
                key={project.slug}
                icon={<IconBriefcase />}
                value={tProjects(`${project.key}.title`)}
                keywords={[project.slug, ...project.tags]}
                onSelect={() => run(() => router.push(`/projects/${project.slug}`))}
              >
                <span className="truncate">{tProjects(`${project.key}.title`)}</span>
                <span className="ml-auto truncate text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                  {project.tags.slice(0, 2).join(', ')}
                </span>
              </PaletteItem>
            ))}
          </Command.Group>

          <Command.Group heading={tCommand('actions')} className="px-1 py-1 text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            <PaletteItem icon={theme === 'dark' ? <IconSun /> : <IconMoon />} value={tCommand('toggleTheme')} onSelect={() => run(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}>
              {tCommand('toggleTheme')}
            </PaletteItem>
            <PaletteItem icon={<IconRefresh />} value={tSettings('replayIntro')} onSelect={() => run(replayIntro)}>
              {tSettings('replayIntro')}
            </PaletteItem>
            <PaletteItem icon={<IconBrandGithub />} value="GitHub" onSelect={() => run(() => window.open('https://github.com/exowz', '_blank', 'noopener,noreferrer'))}>
              GitHub
            </PaletteItem>
            <PaletteItem icon={<IconBrandLinkedin />} value="LinkedIn" onSelect={() => run(() => window.open('https://linkedin.com/in/mke-kapoor', '_blank', 'noopener,noreferrer'))}>
              LinkedIn
            </PaletteItem>
            <PaletteItem icon={<IconBriefcase />} value={tNav('resume')} onSelect={() => run(() => window.open(`/resume-${locale}.pdf`, '_blank', 'noopener,noreferrer'))}>
              {tNav('resume')}
            </PaletteItem>
          </Command.Group>

          <Command.Group heading={tCommand('language')} className="px-1 py-1 text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            {languageOptions.map((language) => (
              <PaletteItem
                key={language.locale}
                value={`${language.name} ${language.region} ${language.locale} ${language.code}`}
                onSelect={() => run(() => router.replace(pathname, { locale: language.locale }))}
              >
                <span className="text-base">{language.flag}</span>
                <span>{language.name}</span>
                <span className="ml-auto text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                  {language.code}
                </span>
              </PaletteItem>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </CommandPaletteContext.Provider>
  );
}

function PaletteItem({
  icon,
  children,
  value,
  keywords,
  onSelect,
}: {
  icon?: ReactNode;
  children: ReactNode;
  value: string;
  keywords?: string[];
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-default select-none items-center gap-2 rounded-2xl px-3 py-2.5 text-sm outline-none aria-selected:bg-accent/15 aria-selected:text-accent"
      style={{ color: 'var(--foreground)' }}
    >
      {icon && <span className="h-4 w-4 shrink-0 opacity-80">{icon}</span>}
      {children}
    </Command.Item>
  );
}
