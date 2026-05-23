import { createContext, useContext, useState } from 'react';

const TextSizeContext = createContext();

const MIN_FONT_SCALE = 0.85;
const MAX_FONT_SCALE = 1.35;
const FONT_SCALE_STEP = 0.1;

export function TextSizeProvider({ children }) {
  const [fontScale, setFontScale] = useState(1);

  const decreaseFontSize = () => {
    setFontScale(prev => Math.max(MIN_FONT_SCALE, Number((prev - FONT_SCALE_STEP).toFixed(2))));
  };

  const increaseFontSize = () => {
    setFontScale(prev => Math.min(MAX_FONT_SCALE, Number((prev + FONT_SCALE_STEP).toFixed(2))));
  };

  return (
    <TextSizeContext.Provider
      value={{
        fontScale,
        decreaseFontSize,
        increaseFontSize,
        minFontScale: MIN_FONT_SCALE,
        maxFontScale: MAX_FONT_SCALE,
      }}
    >
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}
