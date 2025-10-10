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
          className="rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a]/10 dark:border-[#ffffff] dark:text-[#ffffff] dark:hover:bg-[#ffffff]/10 transition-colors gap-2"
        >
          <Globe className="h-[1.1rem] w-[1.1rem]" />
          <span className="text-sm font-medium">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-[#ffffff] dark:bg-[#1a1a1a] border-[#1a1a1a] dark:border-[#ffffff] text-[#1a1a1a] dark:text-[#ffffff]"
      >
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className="cursor-pointer hover:bg-[#1a1a1a]/10 dark:hover:bg-[#ffffff]/10 focus:bg-[#1a1a1a]/10 dark:focus:bg-[#ffffff]/10"
        >
          <Check
            className={`mr-2 h-4 w-4 ${locale === 'en' ? 'opacity-100' : 'opacity-0'}`}
          />
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('fr')}
          className="cursor-pointer hover:bg-[#1a1a1a]/10 dark:hover:bg-[#ffffff]/10 focus:bg-[#1a1a1a]/10 dark:focus:bg-[#ffffff]/10"
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
