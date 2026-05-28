import React, { useCallback, useEffect, useMemo } from 'react';
import initialTokens from './tokens.json';

export type Tokens = typeof initialTokens;

interface StyleRegistryProps {
  children: React.ReactNode;
  dynamicTokens?: Tokens;
}

/**
 * Рекурсивно применяет токены как CSS-переменные к :root
 */
const applyTokensToCSS = (obj: any, prefix = '') => {
  const root = document.documentElement;

  Object.entries(obj).forEach(([key, value]) => {
    const variableName = prefix ? `${prefix}-${key}` : `--${key}`;

    if (typeof value === 'object' && value !== null) {
      applyTokensToCSS(value, variableName);
    } else {
      root.style.setProperty(variableName, String(value));
    }
  });
};

const deepMerge = (base: any, override: any) => {
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  Object.entries(override || {}).forEach(([k, v]) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = deepMerge(base && base[k] ? base[k] : {}, v as any);
    } else {
      out[k] = v;
    }
  });
  return out;
};

export const StyleRegistry: React.FC<StyleRegistryProps> = ({ 
  children, 
  dynamicTokens 
}) => {
  // Определяем должна ли применяться тёмная тема
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const resolveTokens = useCallback((tokens: any, useDark: boolean) => {
    if (!tokens) return tokens;
    // Если есть секция `dark` и включён dark — глубоко мержим
    if (useDark && tokens.dark) {
      const base = { ...tokens };
      delete base.dark;
      return deepMerge(base, tokens.dark);
    }
    // Обычный светлый набор — без ключа dark
    if (tokens.dark) {
      const base = { ...tokens };
      delete base.dark;
      return base;
    }
    return tokens;
  }, []);

  // Выбираем приоритет: dynamicTokens (если переданы), иначе initialTokens
  const tokensToApply = useMemo(() => {
    const source = dynamicTokens || initialTokens;
    return resolveTokens(source, prefersDark);
  }, [dynamicTokens, resolveTokens, prefersDark]);

  useEffect(() => {
    applyTokensToCSS(tokensToApply);

    // слушаем изменения системной темы и переприменяем токены
    let mq: MediaQueryList | null = null;
    if (typeof window !== 'undefined' && window.matchMedia) {
      mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        const useDarkNow = e.matches;
        const source = dynamicTokens || initialTokens;
        const resolved = resolveTokens(source, useDarkNow);
        applyTokensToCSS(resolved);
      };
      // modern API
      if (mq.addEventListener) mq.addEventListener('change', handler as any);
      else mq.addListener && mq.addListener(handler as any);

      return () => {
        if (mq) {
          if (mq.removeEventListener) mq.removeEventListener('change', handler as any);
          else mq.removeListener && mq.removeListener(handler as any);
        }
      };
    }
  }, [tokensToApply, dynamicTokens, resolveTokens]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          transition: all 0.2s ease-in-out; /* Плавное обновление стилей при редактировании */
        }
      `}} />
      {children}
    </>
  );
};