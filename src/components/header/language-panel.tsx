'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from '@/i18n/routing';
import { FiCheck } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { perspective } from './language-animations';
import { LanguageOption } from './language-types';

interface LanguagePanelProps {
  languages: Record<string, LanguageOption>;
  currentLang: string;
  onLanguageClick: () => void;
}

export default function LanguagePanel({ languages, currentLang, onLanguageClick }: LanguagePanelProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Close menu first
    onLanguageClick();

    // Then switch locale using router
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-8 py-6">
      {/* Background elements - theme aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/6 right-1/6 w-24 h-24 rounded-full blur-xl animate-pulse"
          style={{
            background: theme === 'dark'
              ? 'rgba(100, 181, 246, 0.06)'
              : 'rgba(100, 181, 246, 0.1)'
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full blur-lg animate-pulse"
          style={{
            background: theme === 'dark'
              ? 'rgba(144, 164, 174, 0.04)'
              : 'rgba(144, 164, 174, 0.08)',
            animationDelay: '700ms'
          }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-28 h-28 rounded-full blur-2xl animate-pulse"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to right, rgba(100, 181, 246, 0.03), rgba(144, 164, 174, 0.02))'
              : 'linear-gradient(to right, rgba(100, 181, 246, 0.05), rgba(144, 164, 174, 0.03))',
            animationDelay: '300ms'
          }}
        ></div>
      </div>

      {/* Language Selection Header */}
      <div className="relative z-10 text-center mb-6">
        <h3 className={`text-sm font-semibold opacity-80 ${theme === 'dark' ? 'text-white' : 'text-[#333333]'}`}>
          Choose Language
        </h3>
      </div>

      {/* Main Language Grid */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {Object.entries(languages).map(([locale, language], i) => {
          const isActive = locale === currentLang;

          return (
            <div key={`lang_${i}`} className="group relative overflow-hidden w-full max-w-[320px]" style={{ perspective: '1200px' }}>
              {/* Accent line - theme aware */}
              <div
                className="absolute -left-6 top-1/2 w-0.5 h-0 rounded-full opacity-0 group-hover:opacity-50 group-hover:h-10 transition-all duration-500 transform -translate-y-1/2"
                style={{
                  background: 'linear-gradient(to bottom, #64b5f6, #90a4ae)'
                }}
              ></div>

              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <button
                  onClick={() => switchLocale(locale)}
                  className={`
                    grid grid-cols-[36px_1fr_24px] items-center gap-3
                    w-full h-14 px-4 py-3 rounded-xl border backdrop-blur-md
                    font-medium transition-all duration-500 hover:scale-[1.02]
                    ${isActive
                      ? theme === 'dark'
                        ? 'text-[#64b5f6] bg-[rgba(100,181,246,0.15)] border-[rgba(100,181,246,0.3)]'
                        : 'text-[#64b5f6] bg-[rgba(100,181,246,0.1)] border-[rgba(100,181,246,0.25)]'
                      : theme === 'dark'
                        ? 'text-white hover:text-[#64b5f6] border-transparent hover:border-[rgba(100,181,246,0.2)] hover:bg-[rgba(100,181,246,0.1)]'
                        : 'text-[#333333] hover:text-[#64b5f6] border-transparent hover:border-[rgba(100,181,246,0.15)] hover:bg-[rgba(100,181,246,0.08)]'
                    }
                  `}
                  style={{
                    textShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Flag Column - Fixed Width */}
                  <div className="flex justify-center items-center">
                    <span className="text-xl">{language.flag}</span>
                  </div>

                  {/* Text Column - Flexible */}
                  <div className="flex flex-col justify-center min-w-0">
                    <div className="font-semibold text-sm leading-tight truncate">
                      {language.name}
                    </div>
                    <div className="text-xs opacity-70 leading-tight truncate">
                      {language.region}
                    </div>
                  </div>

                  {/* Check Icon Column - Fixed Width */}
                  <div className="flex justify-center items-center">
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <FiCheck className="h-4 w-4 text-[#64b5f6]" />
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>

              {/* Right accent line */}
              <div
                className="absolute -right-6 top-1/2 w-0.5 h-0 rounded-full opacity-0 group-hover:opacity-50 group-hover:h-10 transition-all duration-500 transform -translate-y-1/2"
                style={{
                  background: 'linear-gradient(to top, #64b5f6, #90a4ae)',
                  transitionDelay: '100ms'
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
