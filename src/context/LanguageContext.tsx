import { createContext, FC, ReactNode, useContext, useState } from 'react';

/**
 * Тип для значения контекста языка
 */
interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
}

/**
 * Тип для пропс провайдера
 */
interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<string>('ru');

  const value: LanguageContextType = {
    lang,
    setLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
