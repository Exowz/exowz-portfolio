export type Locale = 'en-GB' | 'fr' | 'es' | 'pt' | 'de' | 'it' | 'zh' | 'ja' | 'ru' | 'ko' | 'hi' | 'ar';

export interface LanguageOption {
    name: string;
    flag: string;
    code: string;
    region: string;
    locale: Locale;
}

export const languages: Record<Locale, LanguageOption> = {
    'en-GB': { name: 'English', flag: '🇬🇧', code: 'GB', region: 'United Kingdom', locale: 'en-GB' },
    'fr': { name: 'Français', flag: '🇫🇷', code: 'FR', region: 'France', locale: 'fr' },
    'es': { name: 'Español', flag: '🇪🇸', code: 'ES', region: 'España', locale: 'es' },
    'pt': { name: 'Português', flag: '🇵🇹', code: 'PT', region: 'Portugal', locale: 'pt' },
    'de': { name: 'Deutsch', flag: '🇩🇪', code: 'DE', region: 'Deutschland', locale: 'de' },
    'it': { name: 'Italiano', flag: '🇮🇹', code: 'IT', region: 'Italia', locale: 'it' },
    'zh': { name: '中文', flag: '🇨🇳', code: 'CN', region: '中国', locale: 'zh' },
    'ja': { name: '日本語', flag: '🇯🇵', code: 'JP', region: '日本', locale: 'ja' },
    'ru': { name: 'Русский', flag: '🇷🇺', code: 'RU', region: 'Россия', locale: 'ru' },
    'ko': { name: '한국어', flag: '🇰🇷', code: 'KR', region: '대한민국', locale: 'ko' },
    'hi': { name: 'हिन्दी', flag: '🇮🇳', code: 'IN', region: 'भारत', locale: 'hi' },
    'ar': { name: 'العربية', flag: '🇸🇦', code: 'SA', region: 'السعودية', locale: 'ar' }
};

export const languageOptions = Object.values(languages);

export interface LanguagePanelProps {
    languages: Record<string, LanguageOption>;
    currentLang: string;
    onLanguageClick: () => void;
    getPathWithoutLocale: () => string;
}

export interface LanguageButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
    currentLocale: string;
}
