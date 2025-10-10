export interface LanguageOption {
    name: string;
    flag: string;
    code: string;
    region: string;
    locale: string;
}

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
