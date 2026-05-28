# 🗺️ Единый план миграции на Дизайн-Систему v2 (Master Plan)

Этот документ объединяет все задачи по переходу со старой системы на новую. Задачи разбиты на мелкие этапы для безопасной реализации.

---

## 1. Общие принципы (Definition of Done)

При работе над любым пунктом:
1. **Типизация:** Только `*.tsx` файлы.
2. **Доступ к данным:** Использовать `useDesignTokens()` (получаем `tokens` и `specs`).
3. **Никакого хардкода:** Запрещены Hex-коды, магические числа для `padding`, `margin`, `borderRadius`, `fontSize`.
4. **Динамика:** Стили должны вычисляться внутри компонента (через `useMemo`), чтобы мгновенно реагировать на смену темы (`isDark`).
5. **Утилизация:** После реализации удалять старые `.js` версии файлов.

---

## 2. Фаза 1: Глобальный фундамент (CRITICAL)

### 2.1. Контейнер ContentPage.tsx
- [ ] Внедрить `useDesignTokens()`.
- [ ] Заменить `maxWidth: 600` на `tokens.layout.contentMaxWidth`.
- [ ] Заменить `paddingHorizontal: 30` на `tokens.spacing.lg`.
- [ ] Заменить `paddingBottom: 120` на `tokens.spacing.xxl * 2`.
- [ ] Переписать логику тени: вместо `shadowColor: '#000'` применить `tokens.shadows.md`.
- [ ] Обернуть итоговые стили в `useMemo`.

### 2.2. Проверка Layout Consumers
- [ ] Найти все импорты `layoutStyles` из `src/styles/layout.js`.
- [ ] Убедиться, что они перешли на вызов `getLayoutStyles(tokens)`.

---

## 3. Фаза 2: Контентные блоки (HIGH)

### 3.1. VideoBlock (Унификация)
- [ ] Удалить `VideoBlock.js`, оставить `VideoBlock.tsx`.
- [ ] Применить `specs.image.video` для высоты и радиусов.
- [ ] В WebView заменить жесткий `background: #000` на `tokens.surface.surfacePrimary`.

### 3.2. TextBlock (Типографика)
- [ ] Связать `Title` с `tokens.typography.heading1`.
- [ ] Связать `Subtitle` с `tokens.typography.heading3`.
- [ ] Связать `Eyebrow` с `tokens.typography.eyebrow` (проверить `textTransform: 'uppercase'`).
- [ ] Связать основной текст с `tokens.typography.bodyMedium`.

### 3.3. QuizBlock (Состояния)
- [ ] Перевести на `specs.quiz`.
- [ ] Заменить цвета `Correct` / `Wrong` на `tokens.text.success` и `tokens.text.danger`.
- [ ] Убрать зависимость от `colors.softAccent`, использовать `tokens.surface.surfaceSecondary`.

### 3.4. ChecklistBlock (Интерактив)
- [ ] Использовать `specs.checklist` для отступов.
- [ ] Заменить фиксированные `16px` на `tokens.spacing.md`.
- [ ] Цвет чекбоксов привязать к `tokens.interactive.accent`.

### 3.5. TimerBlock & SpacerDivider
- [ ] В `TimerBlock` привязать цифры к `tokens.typography.heading1`.
- [ ] В `SpacerDivider` заменить фиксированную высоту на `tokens.spacing.sm`.

### 3.6. Hero & Link Blocks
- [ ] Проверить `HeroBlock`: привязать размеры к `specs.image.hero`.
- [ ] Проверить `LinkBlock`: цвета текста привязать к `tokens.interactive.accent`.

---

## 4. Фаза 3: Системный UI (MEDIUM)

### 4.1. HeaderLanguageSwitcher.tsx
- [ ] Заменить `paddingVertical: 6` на `tokens.spacing.xs`.
- [ ] Заменить `fontSize: 13` на `tokens.typography.labelSmall.fontSize`.
- [ ] Заменить тень на `tokens.shadows.sm`.

### 4.2. LanguageSwitcher.tsx
- [ ] Удалить импорт `radius` из `src/styles/theme`.
- [ ] Использовать `tokens.borders.radiusFull`.
- [ ] Фон и граница активных вариантов привязать к `tokens.interactive.accent` и `tokens.surface.surfacePrimary`.
- [ ] Заменить старые тени на `tokens.shadows.sm`.

### 4.3. HeaderTextSizeControls.tsx
- [ ] Переписать кнопки управления на использование `specs.button.secondary`.
- [ ] Удалить импорт `colors` из `src/styles/theme`.
- [ ] Использовать `tokens.surface.surfacePrimary`, `tokens.border`, `tokens.text.primary`.

### 4.4. App chrome и общие утилиты
- [ ] Мигрировать `Footer.tsx` на `useDesignTokens()` и убрать `spacing`, `typography` из `src/styles/theme`.
- [ ] Мигрировать `ProgressBar.tsx` на `tokens.border` / `tokens.interactive.accent`.
- [ ] Мигрировать `Card.tsx` на `tokens.spacing`, `tokens.borders`, `tokens.shadows` и `specs.card`.
- [ ] Мигрировать `ResponsiveImage.tsx` на `useDesignTokens()` вместо `src/styles/theme`.
- [ ] Мигрировать `ContentRenderer.tsx` / `CardGrid.tsx` на `tokens.spacing`.
- [ ] Удалить дубли `ResponsiveImage.js` и `ImageWithFallback.js` после завершения миграции `.tsx` версий.

---

## 5. Фаза 4: Очистка (LOW / CLEANUP)

### 5.1. Удаление Legacy файлов
- [ ] Удалить `src/styles/tokens/colors.ts`.
- [ ] Удалить `src/styles/quiz.js`.
- [ ] Удалить `src/styles/typography.js`.
- [ ] Удалить `src/styles/lists.js`.
- [ ] Удалить `src/styles/language.js`.
- [ ] Удалить `src/styles/globalStyles.js`.
- [ ] Удалить `src/styles/componentDefaults.js`.
- [ ] Удалить `src/styles/theme.ts` и `src/styles/theme.js` после чистки всех импорта.

### 5.2. Финализация Typography.ts
- [ ] Удалить секцию `Legacy support` в конце файла `src/styles/design-system/typography.ts`.

---

## Текущий статус (Summary)

| Модуль | Статус | Комментарий |
| :--- | :--- | :--- |
| Система токенов | ✅ Готово | Palette, Theme, Specs внедрены |
| AppButton.tsx | ✅ Готово | Эталон |
| Card.tsx | ⚠️ В процессе | Нужно убрать legacy `spacing/radius` |
| Layout.js | ✅ Готово | Функция `getLayoutStyles` написана |
| ContentPage.tsx | ✅ Готово | Миграция завершена |
| Контентные блоки | ⚠️ В процессе | Text, Quiz, Timer готовы; Hero/Link + вспомогательные | 
| UI chrome / shared UI | ⚠️ В процессе | Header/Language/Footer/ProgressBar/ResponsiveImage |
| Навигация | ❌ Не начато | |
| Очистка Legacy | ⚠️ Частично | Нужно убрать legacy style wrappers |
