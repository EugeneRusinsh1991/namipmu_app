# NA_MI_PMU - Образовательное приложение с современной дизайн-системой

## 📱 О проекте

NA_MI_PMU — это мобильное приложение на React Native/Expo, созданное для образовательных целей с современной архитектурой компонентов и типобезопасной дизайн-системой.

### ✨ Ключевые особенности

- **Современная дизайн-система V2** — полностью типизованная архитектура дизайн-токенов
- **TypeScript всюду** — строгая типизация во всех компонентах и хуках
- **React Native + Expo** — кроссплатформенная разработка
- **Локализация** — поддержка нескольких языков
- **Адаптивность** — масштабируемые шрифты и компоновки
- **Система контента** — управление блоками контента через дизайн-систему

---

## 🗂️ Структура проекта

```
src/
├── app/                          # Экраны приложения
├── components/                   # UI-компоненты
│   ├── blocks/                   # Блоки контента (TextBlock, VideoBlock и т.д.)
│   └── *.tsx                      # Основные компоненты (AppButton, Card, Header и т.д.)
├── context/                      # React Context (ThemeContext, LanguageContext)
├── hooks/                        # Custom hooks (useDesignTokens, useInitializeTheme)
├── styles/                       # Стили и дизайн-система
│   └── design-system/            # Модульная дизайн-система
│       ├── theme.ts              # Семантические цвета и токены
│       ├── typography.ts         # Типографские стили
│       ├── components.ts         # Спецификации компонентов
│       └── specs/                # Спецы для Button, Card, Input и т.д.
└── utils/                        # Утилиты (i18n, imageHelpers, storage)
```

---

## 🎨 Дизайн-система V2

### Используемые типы токенов

- **SemanticTokens** — семантические токены цветов, типографии, отступов
- **TypographyStyles** — стили типографии (heading1-3, body, caption, label, eyebrow)
- **ComponentSpecifications** — спецификации компонентов (Button, Card, Input, Quiz, Checklist, Timer, Image)

### Основной хук доступа к дизайн-системе

```typescript
const { tokens, specs, theme, isDark, toggleTheme } = useDesignTokens();

// Использование в компоненте
<Pressable style={{
  height: specs.button.primary.height,
  backgroundColor: tokens.interactive.accent,
  borderRadius: tokens.borders.radiusMd,
}} />
```

### Контекст темы

ThemeProvider поставляет все необходимые токены и стили:

```typescript
export interface ThemeContextValue {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  
  // Дизайн-система
  colors: SemanticTokens;
  typography: TypographyStyles;
  componentStyles: ComponentSpecifications;
}
```

---

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск на разных платформах

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# Общий старт (выбрать платформу)
npm start
```

### Проверка кода

```bash
# Lint проверка
npm run lint

# Валидация контента
npm run validate-content

# Создание Excel шаблона
npm run create-excel
```

---

## 📋 Статус миграции на UI V2

### ✅ Завершено (100%)

Проект **полностью очищен** от legacy-кода V1:

1. **Все компоненты переведены** на TypeScript с новой дизайн-системой
2. **Типизация обновлена** — все `any` типы заменены на строгие типы:
   - `colors: SemanticTokens`
   - `typography: TypographyStyles`
   - `componentStyles: ComponentSpecifications`

3. **Legacy-файлы удалены:**
   - ✅ Удалены дублирующие `.js` файлы из `src/components/` и `src/components/blocks/`
   - ✅ Удалена папка `src/styles/tokens/`
   - ✅ Удалены старые конфигурационные файлы (`theme.ts`, `componentDefaults.js` и т.д.)
   - ✅ Удалены комментарии про legacy-поддержку

4. **Импорты проверены:**
   - ✅ Нет забытых импортов `src/styles/theme`
   - ✅ Нет активных импортов старых `.js` файлов
   - ✅ Вся типизация корректна

### 📊 Детальный отчет

| Компонент | Статус | Тип | Используется |
|-----------|--------|-----|--------------|
| AppButton | ✅ V2 | `.tsx` | Везде |
| Card | ✅ V2 | `.tsx` | Везде |
| ContentRenderer | ✅ V2 | `.tsx` | Везде |
| Header* | ✅ V2 | `.tsx` | Везде |
| Blocks (13 шт) | ✅ V2 | `.tsx` | Везде |
| ThemeContext | ✅ Чистый | `.tsx` | Core |
| useDesignTokens | ✅ Актуальный | `.ts` | Core |

---

## 🔧 Конфигурация и скрипты

### Содержащиеся скрипты

- `npm run lint` — проверка кода
- `npm run generate` — генерация контента из Excel
- `npm run validate-content` — валидация структуры контента
- `npm run backup` — сохранение конфига
- `npm run restore` — восстановление конфига

### Файлы конфигурации

- `app.json` — конфиг Expo
- `tsconfig.json` — конфиг TypeScript
- `babel.config.js` — конфиг Babel
- `metro.config.js` — конфиг Metro bundler
- `eslint.config.js` — правила ESLint

---

## 📚 Типография

### Используемые стили

- `heading1` — 36px, bold
- `heading2` — 28px, bold
- `heading3` — 20px, semibold
- `bodyLarge` — 16px, regular
- `bodyMedium` — 16px, regular
- `bodySmall` — 14px, regular
- `caption` — 12px, regular
- `label` — 14px, semibold
- `labelSmall` — 12px, semibold
- `eyebrow` — 14px, semibold, uppercase

---

## 🌍 Поддержка языков

Приложение поддерживает локализацию через `LanguageContext`:

```typescript
const { lang, setLanguage } = useLanguage();
```

Текущие поддерживаемые языки определены в `src/utils/i18n.ts`.

---

## 📝 Лицензия

NA_MI_PMU © 2026. Все права защищены.

---

## 🤝 Контрибьютинг

Для добавления новых компонентов следуйте архитектуре дизайн-системы:

1. Используйте `useDesignTokens()` для доступа к токенам
2. Определяйте стили через `useMemo`
3. Типизируйте все props и состояние
4. Следуйте соглашениям именования в `src/styles/design-system/`

---

**Последнее обновление:** 28 мая 2026 г. — Финальное завершение миграции UI V2.
