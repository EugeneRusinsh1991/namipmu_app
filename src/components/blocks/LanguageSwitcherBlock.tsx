import React, { FC } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';

/**
 * Props для LanguageSwitcherBlock
 */
interface LanguageSwitcherBlockProps {
  item: any;
  lang: string;
  setLang: (lang: string) => void;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для переключателя языка
 */
export const LanguageSwitcherBlock: FC<LanguageSwitcherBlockProps> = ({ 
  item, 
  lang, 
  setLang, 
  heroOverlapStyle 
}) => {
  return (
    <LanguageSwitcher
      value={lang}
      onChange={(selected: string) => setLang(selected)}
      style={heroOverlapStyle}
    />
  );
};
