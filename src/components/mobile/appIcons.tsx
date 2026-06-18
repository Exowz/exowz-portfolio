import {
  IconFolder,
  IconUser,
  IconMail,
  IconFileText,
  IconBrandGithub,
  IconBrandLinkedin,
  IconScale,
  IconSettings,
  IconBook2,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import type { AppId } from './apps';

/** Icon for each mobile app id. Kept separate from app data so the data stays pure/testable. */
export const APP_ICONS: Record<AppId, ReactNode> = {
  projects: <IconFolder className="h-full w-full" />,
  about: <IconUser className="h-full w-full" />,
  contact: <IconMail className="h-full w-full" />,
  resume: <IconFileText className="h-full w-full" />,
  github: <IconBrandGithub className="h-full w-full" />,
  linkedin: <IconBrandLinkedin className="h-full w-full" />,
  principles: <IconScale className="h-full w-full" />,
  settings: <IconSettings className="h-full w-full" />,
  colophon: <IconBook2 className="h-full w-full" />,
};
