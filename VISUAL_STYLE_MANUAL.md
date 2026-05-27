# 🎨 Руководство по управлению визуалом проекта

В этом проекте используется четырехуровневая система дизайн-токенов. Изменения следует вносить от общего к частному.

---

## 1. Архитектура файлов

| Файл | За что отвечает |
| :--- | :--- |
| `src/styles/design-system/palette.ts` | **Палитра (Primitives).** HEX-коды. Используйте для определения базовых цветов. |
| `src/styles/design-system/theme.ts` | **Темы (Semantic).** Маппинг палитры на роли (текст, фон, акцент). Здесь настраивается **Light/Dark**. |
| `src/styles/design-system/typography.ts` | **Типографика.** Масштабы шрифтов, веса и семейства. |
| `src/styles/design-system/components.ts` | **Спецификации.** Конкретные настройки для кнопок, квизов и инпутов. |
| `src/styles/content-dimensions.ts` | **Константы размеров.** Глобальные размеры карточек, отступы (spacing) и радиусы. |

---

## 2. Маппинг контент-блоков на токены

Используйте эту таблицу для быстрого поиска параметров конкретных блоков контента:

| Блок контента | Что менять | Переменная / Объект | Файл |
| :--- | :--- | :--- | :--- |
| **HeroImage** | Высота и отступ | `IMAGE_SIZES.hero` | `content-dimensions.ts` |
| | Закругление | `borders.radiusMd` | `theme.ts` |
| **Text** (Title) | Шрифт / Размер | `fontSizeXxl` / `familyHeading` | `typography.ts` |
| | Цвет | `text.primary` | `theme.ts` |
| **Text** (Body) | Цвет | `text.secondary` или `bodyText` | `theme.ts` |
| **List** (Булиты) | Цвет маркера | `interactive.accent` | `theme.ts` |
| | Отступы | `SPACING.md` | `content-dimensions.ts` |
| **Quiz** | Фон карточки | `specs.quiz.backgroundColor` | `components.ts` |
| | Цвета ответов | `specs.quiz.selectedBgColor` / `correctBgColor` | `components.ts` |
| **Checklist** | Размер чекбокса | `specs.checklist.checkboxSize` | `components.ts` |
| | Цвет текста | `specs.checklist.itemTextColor` | `components.ts` |
| **Card** | Высота картинки | `CARD_SIZES.large.imageHeight` | `content-dimensions.ts` |

---

## 3. Управление темами (Light & Dark)

Для смены цветов в зависимости от темы используйте файл `src/styles/design-system/theme.ts`.

*   **Светлая тема:** Объект `lightTheme`.
*   **Темная тема:** Объект `darkTheme`.

### Основные ключи в объектах тем:
*   `surface.background`: Общий фон экрана.
*   `text.primary`: Основной цвет текста.
*   `interactive.accent`: Цвет кнопок и активных элементов (розовый по умолчанию).
*   `interactive.border`: Цвет разделителей и рамок.

---

## 4. Типографика

Все настройки текста находятся в `src/styles/design-system/typography.ts`.

### Как изменить шрифт или размер:
1.  Найдите объект `typographyScale`.
2.  **Размеры:** Меняйте `fontSizeSm`, `fontSizeMd`, `fontSizeXl` и т.д.
3.  **Начертание:** Меняйте `fontWeightBold` (например, с `'700'` на `'800'`).
4.  **Шрифты:** Измените `familyMain` (текст) или `familyHeading` (заголовки).

*Примечание: Цвета текста привязаны к типографике через функцию `getTypography` и берутся из темы.*

---

## 5. Глобальные параметры (Borders & Shadows)

### Скругления (Borders)
*   **Логические размеры:** `BORDER_RADIUS` в `src/styles/content-dimensions.ts`.
*   **Применение в теме:** Объект `borders` в `theme.ts` (использует значения `radiusSm`, `radiusMd`, `radiusLg`).

### Тени (Shadows)
*   **Настройки:** Объект `SHADOWS` в `src/styles/content-dimensions.ts`.
*   **Тематические тени:** Объект `shadows` в `theme.ts`. Здесь можно настроить `shadowColor` отдельно для темной темы (обычно `palette.black`) и светлой.

---

## 💡 Памятка по Spacing

Никогда не используйте числа напрямую. Используйте константы из `SPACING` в `src/styles/content-dimensions.ts`:
*   `xs`: 4px | `sm`: 8px | `md`: 16px | `lg`: 24px | `xl`: 32px