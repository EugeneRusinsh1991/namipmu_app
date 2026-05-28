import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import Card from './Card';

/**
 * Локализированный объект - может содержать значения для разных языков
 */
interface LocalizedValue {
  [key: string]: string | number;
}

/**
 * Структура одного элемента в сетке карточек
 */
interface CardGridItem {
  /** Локализированное изображение */
  image: LocalizedValue | string;
  
  /** Локализированный заголовок */
  title: LocalizedValue | string;
  
  /** Локализированное описание */
  description: LocalizedValue | string;
  
  /** Ссылка для навигации (опционально) */
  href?: string;
  
  /** Размер карточки: 'big' или 'small' (по умолчанию 'big') */
  size?: 'big' | 'small';
}

/**
 * Props для компонента CardGrid
 */
interface CardGridProps {
  /** Массив элементов для отображения в сетке */
  items?: CardGridItem[];
  
  /** Язык для локализации (по умолчанию 'ru') */
  lang?: string;
  
  /** Промежуток между карточками в сетке (по умолчанию spacing.md) */
  gap?: number;
  
  /** Дополнительные стили для контейнера (например, для overlap эффекта с hero image) */
  heroOverlapStyle?: ViewStyle;
}

/**
 * CardGrid Component
 * 
 * Сетка карточек с адаптивной раскладкой и промежутками.
 * Поддерживает локализацию и различные размеры карточек.
 * 
 * @param props - CardGridProps
 * @returns JSX элемент сетки или null если нет элементов
 * 
 * @example
 * ```tsx
 * const items: CardGridItem[] = [
 *   {
 *     image: { ru: 'path/to/image1.jpg', en: 'path/to/image1_en.jpg' },
 *     title: { ru: 'Товар 1', en: 'Product 1' },
 *     description: { ru: 'Описание', en: 'Description' },
 *     href: '/product1',
 *     size: 'big'
 *   }
 * ];
 * 
 * <CardGrid 
 *   items={items}
 *   lang="ru"
 *   gap={16}
 *   heroOverlapStyle={{ marginTop: -30 }}
 * />
 * ```
 */
export default function CardGrid({ 
  items = [], 
  lang = 'ru', 
  gap, 
  heroOverlapStyle = {} 
}: CardGridProps): ReactNode {
  const { tokens } = useDesignTokens();
  const effectiveGap = gap ?? tokens.spacing.md;

  // Возвращаем null если нет элементов
  if (!items || items.length === 0) return null;

  // Контейнерный стиль с отрицательным margin для компенсации padding карточек
  const containerStyle: ViewStyle = useMemo(() => ({
    ...styles.container,
    marginHorizontal: -Math.floor(effectiveGap / 2),
    ...heroOverlapStyle,
  }), [tokens, effectiveGap, heroOverlapStyle]);

  return (
    <View style={containerStyle}>
      {items.map((item, idx) => {
        // Локализируем данные карточки
        const title: string = getLocalized(item.title, lang, '');
        const description: string = getLocalized(item.description, lang, '');
        const image = getLocalizedAsset(item.image, lang);
        const size: 'big' | 'small' = item.size || 'big';

        // Стиль для wrapper каждой карточки (с padding для создания промежутков)
        const cardWrapperStyle: ViewStyle = {
          paddingHorizontal: Math.floor(effectiveGap / 2),
          marginBottom: effectiveGap,
        };

        return (
          <View key={idx} style={cardWrapperStyle}>
            <Card
              image={image}
              title={title}
              description={description}
              href={item.href}
              size={size}
              inGrid={true}
              gap={effectiveGap}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  } as ViewStyle,
});
