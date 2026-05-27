import { createContext, FC, ReactNode, useContext, useState } from 'react';

/**
 * Константы для масштабирования шрифта
 */
const MIN_FONT_SCALE = 0.8;
const MAX_FONT_SCALE = 1.4;
const FONT_SCALE_STEP = 0.1;

/**
 * Тип для значения контекста размера текста
 */
interface TextSizeContextType {
  fontScale: number;
  decreaseFontSize: () => void;
  increaseFontSize: () => void;
  minFontScale: number;
  maxFontScale: number;
}

/**
 * Тип для пропс провайдера
 */
interface TextSizeProviderProps {
  children: ReactNode;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export const TextSizeProvider: FC<TextSizeProviderProps> = ({ children }) => {
  const [fontScale, setFontScale] = useState<number>(1);

  const decreaseFontSize = () => {
    setFontScale(prev => Math.max(MIN_FONT_SCALE, Number((prev - FONT_SCALE_STEP).toFixed(2))));
  };

  const increaseFontSize = () => {
    setFontScale(prev => Math.min(MAX_FONT_SCALE, Number((prev + FONT_SCALE_STEP).toFixed(2))));
  };

  const value: TextSizeContextType = {
    fontScale,
    decreaseFontSize,
    increaseFontSize,
    minFontScale: MIN_FONT_SCALE,
    maxFontScale: MAX_FONT_SCALE,
  };

  return (
    <TextSizeContext.Provider value={value}>
      {children}
    </TextSizeContext.Provider>
  );
};

export function useTextSize(): TextSizeContextType {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  return context;
}
