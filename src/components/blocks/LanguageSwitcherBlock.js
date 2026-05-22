import LanguageSwitcher from '../LanguageSwitcher';

export function LanguageSwitcherBlock({ item, lang, setLang, heroOverlapStyle }) {
  return (
    <LanguageSwitcher
      value={lang}
      onChange={(selected) => setLang(selected)}
      style={heroOverlapStyle}
    />
  );
}
