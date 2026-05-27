# Visual Style Guide

Этот документ описывает, где менять цвета, шрифты, размеры, радиусы и другие визуальные параметры в проекте. Он ориентирован на текущую архитектуру темы и дизайн-системы.

---

## 1. Основные места для изменения визуала

### 1.1 Главный источник темы
- `src/styles/design-system/theme.ts`
  - Здесь определяются все семантические токены для **светлой** и **темной** темы.
  - `lightTheme` и `darkTheme` содержат значения:
    - `surface` — фоны и поверхности
    - `text` — цвета текста
    - `interactive` — accent, границы, input
    - `borders` — радиусы и толщины бордеров
    - `shadows` — тени
    - `typography` — базовые размеры шрифтов и веса
    - `spacing` — глобальная шкала отступов
  - Если нужно изменить цвет кнопок, фон карточек, тексты или радиусы для темы — правьте здесь.

### 1.2 Примитивные цвета
- `src/styles/design-system/palette.ts`
  - Содержит базовые цвета (`neutral50`, `pink600`, `blue500` и т.д.).
  - Используется в `theme.ts` для построения семантических токенов.
  - Если нужно добавить новый оттенок, добавляйте сюда.

### 1.3 Типографика
- `src/styles/design-system/typography.ts`
  - Здесь задаются:
    - `fontFamilyBody`, `fontFamilyHeading`
    - `fontSizeXs`, `fontSizeSm`, `fontSizeMd`, `fontSizeLg`, `fontSizeXl`, `fontSizeXxl`
    - `fontWeightRegular`, `fontWeightMedium`, `fontWeightSemibold`, `fontWeightBold`
    - `lineHeightTight`, `lineHeightNormal`, `lineHeightRelaxed`
  - Измените эти значения, чтобы глобально скорректировать базовые размеры и семейства шрифтов.

### 1.4 Компонентные спецификации
- `src/styles/design-system/components.ts`
  - Здесь определяются конкретные размеры и визуал для компонентов:
    - `button` — высота, padding, радиус, цвета, шрифты
    - `card` — фон, border, radius, padding
    - `input` — padding, border, фон, placeholder
    - `quiz`, `checklist`, `timer`, `image` — правила для соответствующих блоков
  - Если нужно изменить визуал конкретного компонента (например, цвет карточки или отступы кнопки) — правьте здесь.

### 1.5 Тема и переключение
- `src/context/ThemeContext.tsx`
  - Управляет текущей темой: `light` / `dark`.
  - Использует `getTheme()` и `getTypography()`.
  - Функция `toggleTheme()` переключает тему, и компоненты автоматически получают новые токены.

### 1.6 Хук для дизайна
- `src/hooks/useDesignTokens.ts`
  - Отсюда берутся токены `tokens` и спецификации `specs`.
  - В большинстве компонентов используется именно этот хук.
  - Пример:
    ```ts
    const { tokens, specs } = useDesignTokens();
    ```

---

## 2. Где менять шрифты

### 2.1 Базовые шрифты
- Файлы:
  - `src/styles/design-system/typography.ts`
  - `src/styles/design-system/theme.ts`
- Параметры:
  - `fontFamilyBody` — основной шрифт текста
  - `fontFamilyHeading` — шрифт заголовков
  - `fontSizeMd`, `fontSizeLg`, `fontSizeXl`, `fontSizeXxl`
  - `fontWeightSemibold`, `fontWeightBold`

### 2.2 Текстовые блоки
- `src/components/blocks/TextBlock.tsx`
  - Используются компоненты:
    - `TitleBlock`
    - `SubtitleBlock`
    - `EyebrowBlock`
    - `TextContentBlock`
  - Эти блоки берут стили из `useTheme()` и `getTypography()`.
- Чтобы изменить стиль текста во всех блоках:
  - меняйте `getTypography()` в `src/styles/design-system/typography.ts`
  - или изменяйте семантические цвета в `src/styles/design-system/theme.ts`

### 2.3 Legacy typography
- `src/styles/typography.js`
  - Этот файл содержит устаревшие стили, которые могут использоваться в некоторых старых компонентах.
  - Если проект полностью на дизайн-системе, основное изменение делайте в `design-system`.

---

## 3. Где менять цвета

### 3.1 Фон и поверхности
- `src/styles/design-system/theme.ts`
  - `surface.background` — основной фон экрана
  - `surface.surfacePrimary` — фон карточек / основной контент
  - `surface.surfaceSecondary` — фон вторичных поверхностей
  - `surface.surfaceTertiary` — фон вложенных элементов
  - `surface.overlay` — полупрозрачный слой

### 3.2 Текстовые цвета
- `text.primary`, `text.secondary`, `text.tertiary`
- `text.onAccent` — текст на кнопке accent
- `text.disabled`, `text.success`, `text.warning`, `text.danger`

### 3.3 Accent и интерактивные цвета
- `interactive.accent` — основной акцент (кнопки, ссылки)
- `interactive.accentHover` — hover / active
- `interactive.accentLight` — мягкий фон accent
- `interactive.secondary` — вторичный акцент
- `interactive.border` — цвет границ
- `interactive.inputBorder` — граница input

### 3.4 Где меняется цвет деталей
- `src/components/blocks/LinkBlock.tsx` — текст ссылки
- `src/components/blocks/ListBlock.tsx` — цвет bullets и текста списка
- `src/components/blocks/SpacerDivider.tsx` — цвет текста разделителя
- `src/components/blocks/LanguageSwitcherBlock.tsx` — переключатель языка
- `src/components/blocks/NavigationBlock.tsx` — кнопки навигации через `AppButton`
- `src/components/AppButton.tsx` — использует цвета из `specs.button` и `tokens.text`

### 3.5 Где менять фон карточек и border
- `src/components/blocks/CardBlock.tsx`
- `src/components/Card.tsx`
- `src/styles/design-system/components.ts` — секция `card`
- `src/styles/design-system/theme.ts` — `surface.surfaceSecondary`, `interactive.border`, `text.primary`

---

## 4. Где менять радиусы и отступы

### 4.1 Глобальные радиусы
- `src/styles/design-system/theme.ts`
  - `borders.radiusSm`
  - `borders.radiusMd`
  - `borders.radiusLg`
  - `borders.radiusFull`
- Эти значения используются в `src/styles/design-system/components.ts`.

### 4.2 Отступы
- `src/styles/design-system/theme.ts`
  - `spacing.xs`, `spacing.sm`, `spacing.md`, `spacing.lg`, `spacing.xl`, `spacing.xxl`
- Где конкретно применяются:
  - `src/styles/design-system/components.ts` — padding/button
  - `src/components/Card.tsx` и `CardGrid.tsx` — gap, margin
  - `src/components/blocks/ListBlock.tsx` — margin для списка

### 4.3 Размеры элементов
- `src/styles/design-system/components.ts`:
  - `button.height`, `button.paddingHorizontal`, `button.paddingVertical`
  - `card.padding`, `card.borderRadius`
  - `input.height`, `input.paddingHorizontal`, `input.paddingVertical`
  - `quiz.answerPadding`, `quiz.answerMargin`
  - `checklist.itemPadding`, `checklist.itemMarginBottom`
  - `timer.padding`

---

## 5. Блоки контента и где править их визуал

### Текст
- `src/components/blocks/TextBlock.tsx`
  - Изменяйте шрифт, размер и цвет через `src/styles/design-system/typography.ts`
  - Цвета текста берет `useTheme()` → `colors.text.primary / secondary / tertiary`

### Список и bullets
- `src/components/blocks/ListBlock.tsx`
  - Бюллеты (`•`) и текст используют `colors.accent` и `colors.bodyText`
  - Чтобы изменить фон буллетов, правьте стиль `listBullet` или `colors.accent`

### Разделитель / spacer
- `src/components/blocks/SpacerDivider.tsx`
  - Текст разделителя получает `typography.spacer` и `colors.borderDefault`

### Ссылки
- `src/components/blocks/LinkBlock.tsx`
  - Цвет ссылки берётся из `colors.accent`
  - Текст — `ScaledText`

### Карточки
- `src/components/blocks/CardBlock.tsx`
- `src/components/Card.tsx`
  - Фон карточки определяется через `useTheme()` и `Card` / `CardBlock`
  - Размеры карт и radius берутся из `src/styles/design-system/components.ts`

### Hero image
- `src/components/blocks/HeroBlock.tsx`
  - Стиль обложки и overlay задаются в этом файле
  - Фон/overlay можно менять здесь, а также значения `colors.background` / `colors.overlay`

### Навигация и кнопки
- `src/components/blocks/NavigationBlock.tsx`
- `src/components/AppButton.tsx`
  - Цвета и отступы кнопок берутся из `specs.button` и `tokens`.
  - Чтобы изменить визуал всех кнопок — правьте `src/styles/design-system/components.ts` и `src/styles/design-system/theme.ts`.

### Квизы и чеклисты
- `src/components/blocks/QuizBlock.tsx`
- `src/components/blocks/ChecklistBlock.tsx`
  - Используют `useTheme()` для цветов
  - Основные размеры и radius определяются в блоках, но можно унифицировать через `components.ts`

### Таймер
- `src/components/blocks/TimerBlock.tsx`
  - Использует темы для цветов и `Animated` для прогресс-бара
  - Размеры и цвета задаются прямо в компоненте, но базовые цвета берутся из `useTheme()`

### Видео
- `src/components/blocks/VideoBlock.tsx`
  - Фон, рамка и сообщения берут `useTheme()`
  - Изменить тему видео можно через `colors` в `theme.ts`

---

## 6. Как поменять светлую / темную тему

1. Откройте `src/styles/design-system/theme.ts`.
2. Найдите блок `lightTheme` и `darkTheme`.
3. Измените нужные значения:
   - `surface.background`, `surface.surfacePrimary`, `surface.surfaceSecondary`
   - `text.primary`, `text.secondary`, `text.tertiary`
   - `interactive.accent`, `interactive.accentHover`, `interactive.accentLight`
   - `borders.radiusMd` и `spacing.md`
4. Если нужен новый цвет, добавьте его в `src/styles/design-system/palette.ts` и подставьте в `theme.ts`.
5. Перезапустите приложение, если используется кэш.

---

## 7. Особенности и примечания

- Проект использует **дизайн-систему**. Это главная точка правки.
- `src/styles/theme.ts` и `src/styles/globalStyles.js` — **legacy / обратная совместимость**.
- Для новых изменений лучше редактировать `src/styles/design-system/*`, а не legacy-файлы.
- Тему переключает `src/context/ThemeContext.tsx` через `toggleTheme()`.
- Все компоненты получают цвета через `useDesignTokens()` или `useTheme()`.

---

## 8. Быстрые ссылки

- `src/styles/design-system/theme.ts` — светлая/темная тема
- `src/styles/design-system/palette.ts` — базовые цвета
- `src/styles/design-system/typography.ts` — размеры шрифтов и семейства
- `src/styles/design-system/components.ts` — специфики компонентов
- `src/context/ThemeContext.tsx` — переключение темы
- `src/hooks/useDesignTokens.ts` — доступ к токенам
- `src/components/blocks/TextBlock.tsx` — текстовые блоки
- `src/components/blocks/ListBlock.tsx` — bullets и списки
- `src/components/blocks/CardBlock.tsx` — карточки контента
- `src/components/AppButton.tsx` — кнопки
- `src/components/blocks/HeroBlock.tsx` — hero image
