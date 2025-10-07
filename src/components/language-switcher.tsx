'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-[#003049] text-[#003049] hover:bg-[#003049]/10 dark:border-[#FDF0D5] dark:text-[#FDF0D5] dark:hover:bg-[#FDF0D5]/10 transition-colors gap-2"
        >
          <Globe className="h-[1.1rem] w-[1.1rem]" />
          <span className="text-sm font-medium">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-[#FDF0D5] dark:bg-[#003049] border-[#003049] dark:border-[#FDF0D5] text-[#003049] dark:text-[#FDF0D5]"
      >
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className="cursor-pointer hover:bg-[#003049]/10 dark:hover:bg-[#FDF0D5]/10 focus:bg-[#003049]/10 dark:focus:bg-[#FDF0D5]/10"
        >
          <Check
            className={`mr-2 h-4 w-4 ${locale === 'en' ? 'opacity-100' : 'opacity-0'}`}
          />
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('fr')}
          className="cursor-pointer hover:bg-[#003049]/10 dark:hover:bg-[#FDF0D5]/10 focus:bg-[#003049]/10 dark:focus:bg-[#FDF0D5]/10"
        >
          <Check
            className={`mr-2 h-4 w-4 ${locale === 'fr' ? 'opacity-100' : 'opacity-0'}`}
          />
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
