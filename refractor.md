# ️ Дорожная карта перехода на Дизайн-Систему v2

Этот документ содержит список узлов, которые требуют рефакторинга для полной поддержки темной темы, устранения магических чисел и перехода на систему токенов (Palette -> Semantic Theme -> Component Specs).

---

## 1. Фундамент и Глобальные контейнеры (Priority: CRITICAL)

- [ ] **`src/pages/ContentPage.tsx`**
  - **Что сделать:** Внедрить `useDesignTokens`. Заменить фиксированный `maxWidth: 600` на `tokens.layout.contentMaxWidth`. 
  - **Детали:** Использовать `tokens.spacing.lg` для боковых отступов. Тени (сейчас `shadowColor: '#000'`) заменить на объект `tokens.shadows.md`.
  - **Важно:** Стили должны вычисляться внутри компонента (через `useMemo`), чтобы страница мгновенно меняла цвет при переключении темы.
  
- [x] **`src/styles/layout.js`**
  - **Статус:** Выполнено (Логика переведена на `getLayoutStyles(tokens)`).
  - **Осталось:** Проверить всех потребителей этого файла и убедиться, что они вызывают функцию с актуальными токенами.

---

## 2. Контентные блоки уроков (Priority: HIGH)

Эти блоки формируют 90% визуала приложения. Сейчас они «прибиты» к старой теме.

- [ ] **`VideoBlock` (Унификация)**
  - **Проблема:** Наличие и `.js`, и `.tsx` версий. Хардкод размеров (220) и радиусов (10).
  - **Решение:** Удалить `.js`, оставить один `.tsx`. Использовать `specs.image.video` для контейнера.
  - **Тонкий момент:** Заменить инлайновый стиль `background: #000` в WebView на `tokens.surface.background`, чтобы видео-плейсхолдер не "дырявил" тему.

- [ ] **`QuizBlock.js` -> `QuizBlock.tsx`**
  - **Что сделать:** Полный перенос на TS. Использовать `specs.quiz`.
  - **Цвета:** Состояния "Correct/Wrong" привязать к `tokens.text.success` и `tokens.text.danger` (или `warning`). Уйти от `colors.softAccent`.

- [ ] **`ChecklistBlock.js` -> `ChecklistBlock.tsx`**
  - **Что сделать:** Использовать `specs.checklist`. Заменить `marginBottom: 16` на `tokens.spacing.md`.
  - **Интерактив:** Цвет галочки привязать к `tokens.interactive.accent`.

- [ ] **`TextBlock.js` (Title, Subtitle, Eyebrow)**
  - **Что сделать:** Это критически важный блок. Нужно внедрить `tokens.typography`.
  - **Маппинг:** 
    - `Title` -> `heading1`
    - `Subtitle` -> `heading3`
    - `Eyebrow` -> `eyebrow` (с сохранением `textTransform: 'uppercase'`).

- [ ] **`TimerBlock.js` & `SpacerDivider`**
  - **Timer:** Шрифт цифр привязать к `tokens.typography.heading1`. Отступы из `specs.timer`.
  - **Divider:** Высоту разделителя брать из `tokens.spacing.xs` (или другого подходящего токена).

---

## 3. Системный интерфейс (Priority: MEDIUM)

- [ ] **`HeaderLanguageSwitcher.tsx`**
  - **Что сделать:** Убрать магию `paddingVertical: 6` и `fontSize: 13`. 
  - **Решение:** Использовать `tokens.spacing.xs` и `tokens.typography.labelSmall`. Тень заменить на `tokens.shadows.sm`.

- [ ] **`LanguageSwitcher.tsx`**
  - **Проблема:** Импорт `radius` напрямую из старой темы.
  - **Решение:** Перейти на `tokens.borders.radiusFull` и `tokens.interactive.secondary` для фонов.

- [ ] **`HeaderTextSizeControls.tsx`**
  - **Что сделать:** Стили кнопок +/- должны соответствовать `specs.button.secondary` (в мини-варианте).

---

## 4. Очистка и Удаление (Priority: LOW / Cleanup)

Только после того, как все чекбоксы выше будут отмечены:
- [ ] **Удалить:** `src/styles/tokens/colors.ts` (старая палитра).
- [ ] **Удалить:** `src/styles/quiz.js`, `src/styles/typography.js`, `src/styles/lists.js`.
- [ ] **Удалить:** `src/styles/componentDefaults.js`.
- [ ] **Рефакторинг `typography.ts`:** Удалить секцию `Legacy support` (title, subtitle, text) в конце файла.

---

## 🛠 Технический стандарт (Definition of Done)

При работе над любым компонентом из списка:
1. **Никаких Hex-кодов:** Только `tokens.surface.*`, `tokens.text.*` и т.д.
2. **Никаких магических чисел:** Любой отступ — это `tokens.spacing.xx`.
3. **Типизация:** Компонент должен быть на TypeScript (`.tsx`).
4. **Динамика:** Стили вычисляются **внутри** компонента. Статичные `StyleSheet.create` вне функций запрещены для свойств, зависящих от темы.

---

## Состояние миграции на сегодня

| Модуль | Статус | Комментарий |
| :--- | :--- | :--- |
| **Система токенов** | ✅ Готово | Palette, Theme, Specs внедрены |
| **AppButton.tsx** | ✅ Готово | Эталон реализации |
| **Card.tsx** | ✅ Готово | Эталон реализации |
| **Layout** | ⚠️ В процессе | Файл готов, нужно внедрение в ContentPage |
| **Блоки контента** | ❌ Legacy | Основной объем работы |
| **Dark Mode** | ⚠️ Partial | Работает только в переделанных компонентах |

---

## 📈 Рекомендуемый порядок выполнения

1.  **ContentPage.tsx** — даст мгновенный эффект "правильного контейнера".
2.  **VideoBlock** — исправит дублирование и визуальные огрехи.
3.  **TextBlock** — приведет все тексты в уроках к единому стандарту.
4.  **Quiz / Checklist** — самые сложные функциональные блоки.
5.  **Навигация** — финальные штрихи интерфейса.
```