# Техническое задание: Визуальный конфигуратор UI системы (UI Lab)

Этот документ является **очень подробной инструкцией** по реализации внутреннего инструмента для настройки визуального стиля приложения.
**Главная цель:** Позволить дизайнерам и разработчикам изменять цвета, отступы, шрифты и другие стили через удобный графический интерфейс (GUI) в браузере, а затем автоматически сохранять эти изменения обратно в файлы проекта. Это устранит необходимость "ковыряться в коде" для тонкой настройки UI.

---

## Этап 1: Подготовка фундамента (Design Tokens)
**Задача:** Создать централизованное хранилище для всех стилей приложения в виде JSON-обобъекта. Это позволит управлять стилями из одного места.

*   **Что сделать:**
    1.  Создать новый файл по пути: `src/styles/tokens.json`.
    2.  Заполнить его базовыми значениями для цветов, отступов и типографики.
*   **Пример структуры данных для `src/styles/tokens.json`:**
    ```json
    {
      "colors": {
        "primary": "#3498db",
        "secondary": "#2ecc71",
        "background": "#f0f2f5",
        "text": "#333333",
        "border": "#dddddd"
      },
      "spacing": {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px"
      },
      "typography": {
        "fontFamily": "Inter, sans-serif",
        "fontSizeBase": "16px",
        "lineHeightBase": "1.5",
        "heading1Size": "32px",
        "heading2Size": "24px"
      },
      "borderRadius": {
        "sm": "4px",
        "md": "8px",
        "lg": "12px"
      },
      "shadows": {
        "default": "0px 2px 4px rgba(0, 0, 0, 0.1)"
      }
    }
    ```
*   **За что отвечает этот файл:**
    *   **Единый источник правды (Single Source of Truth):** Все стили приложения будут ссылаться только на эти значения.
    *   **Абстракция:** Компоненты не будут знать конкретные значения (`#fff`, `16px`), они будут использовать именованные токены (`--color-background`, `--spacing-md`).
*   **Как это будет использоваться в CSS/JS:**
    *   В CSS: `background-color: var(--color-background); padding: var(--spacing-md);`
    *   В Styled Components: `background-color: ${props => props.theme.colors.background};` (после преобразования токенов в объект темы).
*   **Ожидаемый результат:** Если ты вручную изменишь, например, `"primary": "#3498db"` на `"primary": "red"` в `tokens.json`, то после перезагрузки страницы все элементы, использующие `var(--color-primary)`, станут красными.

## Этап 2: ThemeProvider и внедрение стилей
**Задача:** Создать React-компонент, который будет читать `tokens.json` и преобразовывать его в CSS-переменные, доступные всему приложению. Этот компонент будет "слушать" изменения токенов и мгновенно обновлять стили.

*   **Что сделать:**
    1.  Создать файл `src/components/StyleRegistry.tsx`.
    2.  Написать функцию, которая рекурсивно преобразует JSON-объект токенов в плоский список CSS-переменных.
    3.  Использовать `useEffect` для применения этих переменных к `document.documentElement` (корневому элементу HTML).
    4.  Обернуть всё приложение в этот `StyleRegistry`.
*   **Пример кода для `src/components/StyleRegistry.tsx`:**
    ```typescript
    import React, { useEffect } from 'react';
    import initialTokens from '../styles/tokens.json'; // Начальные токены

    // Типизация для токенов (можно расширить)
    interface Tokens {
      colors: Record<string, string>;
      spacing: Record<string, string>;
      typography: Record<string, string>;
      borderRadius: Record<string, string>;
      shadows: Record<string, string>;
    }

    // Функция для преобразования в CSS переменные
    const applyTokensToCSS = (tokens: Tokens) => {
      const root = document.documentElement;
      // Очищаем старые переменные, если нужно, или просто перезаписываем
      // root.style.cssText = ''; // Осторожно, это удалит все инлайн стили!

      Object.entries(tokens).forEach(([category, values]) => {
        Object.entries(values).forEach(([name, value]) => {
          const cssVarName = `--${category}-${name}`; // Например, --colors-primary
          root.style.setProperty(cssVarName, value);
        });
      });
    };

    interface StyleRegistryProps {
      children: React.ReactNode;
      // Добавим пропс для динамического обновления токенов из редактора
      dynamicTokens?: Tokens;
    }

    export const StyleRegistry: React.FC<StyleRegistryProps> = ({ children, dynamicTokens }) => {
      useEffect(() => {
        // Применяем начальные токены при монтировании
        applyTokensToCSS(initialTokens as Tokens);
      }, []); // Запускаем один раз при монтировании

      useEffect(() => {
        // Если dynamicTokens изменились (из редактора), применяем их
        if (dynamicTokens) {
          applyTokensToCSS(dynamicTokens);
        }
      }, [dynamicTokens]); // Запускаем при изменении dynamicTokens

      return <>{children}</>;
    };
    ```
*   **Как использовать в `src/App.tsx` (или корневом компоненте):**
    ```typescript
    import React, { useState } from 'react';
    import { StyleRegistry } from './components/StyleRegistry';
    import initialTokens from './styles/tokens.json'; // Начальные токены

    function App() {
      const [currentTokens, setCurrentTokens] = useState(initialTokens);

      // ... здесь будет логика для получения dynamicTokens из редактора ...
      // Например, через Context API или Redux, или просто пропсом, если редактор в том же окне.

      return (
        <StyleRegistry dynamicTokens={currentTokens}>
          {/* Здесь всё ваше приложение */}
          <div style={{ backgroundColor: 'var(--colors-background)', padding: 'var(--spacing-md)' }}>
            <h1 style={{ color: 'var(--colors-primary)', fontSize: 'var(--typography-heading1Size)' }}>
              Привет, мир!
            </h1>
            <button style={{ backgroundColor: 'var(--colors-primary)', color: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--borderRadius-sm)' }}>
              Нажми меня
            </button>
          </div>
        </StyleRegistry>
      );
    }

    export default App;
    ```
*   **За что отвечает:**
    *   **Мгновенное применение стилей (Live Preview):** Как только `dynamicTokens` меняются (например, из редактора), `useEffect` срабатывает, и стили в браузере обновляются без перезагрузки страницы.
    *   **Централизованное управление:** Все стили приложения теперь зависят от одного объекта `tokens`.

## Этап 3: Интерфейс Редактора (Admin Panel)
**Задача:** Создать отдельное веб-приложение (или страницу в текущем приложении), которое будет служить графическим интерфейсом для изменения токенов.

*   **Что сделать:**
    1.  **Установить библиотеку:** `npm install leva` (или `yarn add leva`). Leva — это отличный инструмент для создания GUI-контролов.
    2.  **Создать новую страницу/роут:** Например, `/ui-lab` в вашем React-приложении.
    3.  **Разместить `<iframe>`:** В центральной части этой страницы разместить `<iframe>`, который будет загружать ваше основное приложение (например, `http://localhost:3000`). Это критично для изоляции стилей.
    4.  **Реализовать правую панель (Инспектор) с `Leva`:**
        *   Использовать хук `useControls` из `Leva` для создания интерактивных элементов управления.
        *   Каждый контрол должен быть связан с соответствующим полем в объекте `tokens`.
*   **Пример кода для `src/pages/UiLabPage.tsx`:**
    ```typescript
    import React, { useState, useEffect, useCallback } from 'react';
    import { useControls, Leva } from 'leva'; // Импортируем Leva
    import initialTokens from '../styles/tokens.json'; // Начальные токены
    import { StyleRegistry } from '../components/StyleRegistry'; // Наш ThemeProvider

    // Типизация для токенов (должна совпадать с tokens.json)
    interface Tokens {
      colors: Record<string, string>;
      spacing: Record<string, string>;
      typography: Record<string, string>;
      borderRadius: Record<string, string>;
      shadows: Record<string, string>;
    }

    const UiLabPage: React.FC = () => {
      // Состояние для токенов, которые будут меняться через Leva
      const [liveTokens, setLiveTokens] = useState<Tokens>(initialTokens as Tokens);

      // Используем Leva для создания контролов
      // Объект, который передается в useControls, должен быть плоским для удобства Leva
      const [levaControls, setLevaControls] = useControls(() => ({
        // Секция "Colors"
        'Colors': Leva.folder({
          primary: { value: liveTokens.colors.primary, label: 'Primary Color' },
          secondary: { value: liveTokens.colors.secondary, label: 'Secondary Color' },
          background: { value: liveTokens.colors.background, label: 'Background Color' },
          text: { value: liveTokens.colors.text, label: 'Text Color' },
          border: { value: liveTokens.colors.border, label: 'Border Color' },
        }),
        // Секция "Spacing"
        'Spacing': Leva.folder({
          xs: { value: parseInt(liveTokens.spacing.xs), min: 0, max: 50, step: 1, label: 'Extra Small (px)' },
          sm: { value: parseInt(liveTokens.spacing.sm), min: 0, max: 50, step: 1, label: 'Small (px)' },
          md: { value: parseInt(liveTokens.spacing.md), min: 0, max: 100, step: 1, label: 'Medium (px)' },
          lg: { value: parseInt(liveTokens.spacing.lg), min: 0, max: 100, step: 1, label: 'Large (px)' },
          xl: { value: parseInt(liveTokens.spacing.xl), min: 0, max: 150, step: 1, label: 'Extra Large (px)' },
        }),
        // Секция "Typography"
        'Typography': Leva.folder({
          fontFamily: { value: liveTokens.typography.fontFamily, label: 'Font Family' },
          fontSizeBase: { value: parseInt(liveTokens.typography.fontSizeBase), min: 10, max: 30, step: 1, label: 'Base Font Size (px)' },
          lineHeightBase: { value: parseFloat(liveTokens.typography.lineHeightBase), min: 1, max: 2, step: 0.1, label: 'Base Line Height' },
          heading1Size: { value: parseInt(liveTokens.typography.heading1Size), min: 20, max: 60, step: 1, label: 'H1 Size (px)' },
        }),
        // ... другие секции для borderRadius, shadows и т.д.
      }), [liveTokens]); // Пересоздаем контролы, если liveTokens изменились

      // Эффект для синхронизации Leva-контролов с liveTokens
      useEffect(() => {
        // При изменении levaControls, обновляем liveTokens
        const newTokens: Tokens = {
          colors: {
            primary: levaControls.primary,
            secondary: levaControls.secondary,
            background: levaControls.background,
            text: levaControls.text,
            border: levaControls.border,
          },
          spacing: {
            xs: `${levaControls.xs}px`,
            sm: `${levaControls.sm}px`,
            md: `${levaControls.md}px`,
            lg: `${levaControls.lg}px`,
            xl: `${levaControls.xl}px`,
          },
          typography: {
            fontFamily: levaControls.fontFamily,
            fontSizeBase: `${levaControls.fontSizeBase}px`,
            lineHeightBase: String(levaControls.lineHeightBase),
            heading1Size: `${levaControls.heading1Size}px`,
            heading2Size: liveTokens.typography.heading2Size, // Пока не редактируем
          },
          borderRadius: liveTokens.borderRadius, // Пока не редактируем
          shadows: liveTokens.shadows, // Пока не редактируем
        };
        setLiveTokens(newTokens);
      }, [levaControls]);

      // Функция для отправки токенов на сервер (Этап 5)
      const saveTokens = useCallback(async () => {
        try {
          const response = await fetch('http://localhost:3001/save-tokens', { // Порт сервера из Этапа 5
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(liveTokens),
          });
          if (response.ok) {
            console.log('Tokens saved successfully!');
            alert('Токены успешно сохранены в файл!');
          } else {
            console.error('Failed to save tokens:', response.statusText);
            alert('Ошибка при сохранении токенов.');
          }
        } catch (error) {
          console.error('Error saving tokens:', error);
          alert('Произошла ошибка при сохранении токенов.');
        }
      }, [liveTokens]);

      return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {/* Левая панель (пока заглушка) */}
          <div style={{ width: '200px', borderRight: '1px solid #eee', padding: '10px' }}>
            <h3>Компоненты</h3>
            <ul>
              <li>Кнопка</li>
              <li>Инпут</li>
              {/* ... список компонентов */}
            </ul>
          </div>

          {/* Центральная часть - iframe с приложением */}
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <iframe
              src="http://localhost:3000" // URL вашего основного приложения
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="App Preview"
            ></iframe>
          </div>

          {/* Правая панель - Leva GUI */}
          <div style={{ width: '300px', borderLeft: '1px solid #eee', overflowY: 'auto', padding: '10px' }}>
            <Leva collapsed={false} /> {/* Leva GUI */}
            <button
              onClick={saveTokens}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '10px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              💾 Сохранить изменения в код
            </button>
          </div>
        </div>
      );
    };

    export default UiLabPage;
    ```
*   **За что отвечает:**
    *   **Визуальное редактирование:** Предоставляет удобные ползунки, цветовые пипетки и текстовые поля для изменения значений токенов.
    *   **Изоляция:** `<iframe>` гарантирует, что стили самого редактора не влияют на стили редактируемого приложения.
    *   **Синхронизация:** `Leva` автоматически обновляет `levaControls`, а `useEffect` затем обновляет `liveTokens`, которые передаются в `StyleRegistry` (из Этапа 2), мгновенно меняя UI приложения.

## Этап 4: Инспектор "Наведи и нажми"
**Задача:** Улучшить UX редактора, позволяя пользователю кликать по элементам в `<iframe>` и автоматически переходить к соответствующим настройкам в панели `Leva`.

*   **Что сделать:**
    1.  **Добавить атрибуты `data-token-id`:** В вашем основном приложении (внутри `<iframe>`), добавьте атрибуты `data-token-id` к элементам, которые вы хотите редактировать. Например:
        ```html
        <button data-token-id="colors-primary" style="background-color: var(--colors-primary);">Primary Button</button>
        <div data-token-id="spacing-md" style="padding: var(--spacing-md);">Content</div>
        ```
        *Важно:* `data-token-id` должен соответствовать пути к токену в вашем `tokens.json` (например, `colors-primary` для `tokens.colors.primary`).
    2.  **Слушатель событий в редакторе:** В `UiLabPage.tsx` добавить слушатель событий для `<iframe>`.
    3.  **Логика обработки клика:**
        *   При клике в `<iframe>`, получить `event.target`.
        *   Проверить наличие атрибута `data-token-id`.
        *   Если атрибут есть, использовать функцию `Leva` для фокусировки на соответствующем контроле (например, `Leva.focus('colors.primary')`).
*   **Пример кода (добавить в `UiLabPage.tsx`):**
    ```typescript
    // ... внутри компонента UiLabPage ...
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const handleIframeClick = (event: MessageEvent) => {
        // Проверяем, что сообщение пришло из нашего iframe
        if (event.source !== iframe.contentWindow) return;

        const { type, dataTokenId } = event.data;
        if (type === 'UI_LAB_CLICK' && dataTokenId) {
          // Leva позволяет фокусироваться на контроле по его пути
          // Нужно преобразовать 'colors-primary' в 'Colors.primary' для Leva
          const [category, name] = dataTokenId.split('-');
          const levaPath = `${category.charAt(0).toUpperCase() + category.slice(1)}.${name}`;
          Leva.focus(levaPath);
        }
      };

      window.addEventListener('message', handleIframeClick);

      // Добавляем слушатель кликов внутри iframe
      const setupIframeClickListener = () => {
        if (iframe.contentDocument) {
          iframe.contentDocument.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const dataTokenId = target.dataset.tokenId;
            if (dataTokenId) {
              // Отправляем сообщение родительскому окну (редактору)
              window.parent.postMessage({ type: 'UI_LAB_CLICK', dataTokenId }, '*');
            }
          });
        }
      };

      // Ждем загрузки iframe
      iframe.onload = setupIframeClickListener;
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        setupIframeClickListener(); // Если iframe уже загружен
      }

      return () => {
        window.removeEventListener('message', handleIframeClick);
        // Очистка слушателя внутри iframe, если возможно
        if (iframe.contentDocument) {
          iframe.contentDocument.body.removeEventListener('click', () => {}); // Это не совсем корректно, лучше сохранять ссылку на функцию
        }
      };
    }, []);

    // ... в JSX:
    // <iframe ref={iframeRef} src="http://localhost:3000" ... />
    ```
*   **За что отвечает:**
    *   **Удобство:** Значительно ускоряет процесс настройки, позволяя быстро находить нужные параметры.
    *   **Интуитивность:** Пользователь взаимодействует напрямую с элементами UI.

## Этап 5: Сохранение в код (The Bridge)
**Задача:** Реализовать механизм, который позволит редактору отправлять измененные токены на локальный сервер, а сервер будет записывать их обратно в файл `src/styles/tokens.json`.

*   **Что сделать:**
    1.  **Создать Node.js сервер:** В корне вашего проекта создайте папку `scripts` и в ней файл `sync-server.js`.
    2.  **Установить зависимости:** `npm install express cors` (или `yarn add express cors`). `cors` нужен для разрешения кросс-доменных запросов из браузера.
    3.  **Реализовать API Endpoint:** Сервер должен слушать `POST` запросы на определенный URL (например, `/save-tokens`).
    4.  **Запись в файл:** При получении запроса, сервер должен взять JSON из тела запроса и перезаписать им файл `src/styles/tokens.json`.
*   **Пример кода для `scripts/sync-server.js`:**
    ```javascript
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const cors = require('cors'); // Для разрешения запросов из браузера

    const app = express();
    const PORT = 3001; // Выберите порт, отличный от порта вашего React-приложения

    // Разрешаем CORS для вашего React-приложения (например, на порту 3000)
    app.use(cors({ origin: 'http://localhost:3000' }));
    app.use(express.json()); // Для парсинга JSON из тела запроса

    // Путь к файлу tokens.json относительно корня проекта
    const tokensFilePath = path.resolve(__dirname, '../src/styles/tokens.json');

    app.post('/save-tokens', (req, res) => {
      const newTokens = req.body;
      if (!newTokens) {
        return res.status(400).send('No tokens provided.');
      }

      try {
        // Записываем новый JSON в файл
        fs.writeFileSync(tokensFilePath, JSON.stringify(newTokens, null, 2), 'utf8');
        console.log('Tokens updated successfully:', tokensFilePath);
        res.status(200).send('Tokens saved successfully!');
      } catch (error) {
        console.error('Error writing tokens file:', error);
        res.status(500).send('Failed to save tokens.');
      }
    });

    app.listen(PORT, () => {
      console.log(`Sync server listening on port ${PORT}`);
      console.log(`Tokens file path: ${tokensFilePath}`);
    });
    ```
*   **Как запустить сервер:** Откройте терминал в папке `scripts` и выполните `node sync-server.js`.
*   **За что отвечает:**
    *   **Автоматизация:** Устраняет ручное копирование и вставку стилей.
    *   **Сохранение:** Гарантирует, что изменения, сделанные в редакторе, сохраняются в кодовой базе.
*   **Ожидаемый результат:** Нажал кнопку "Сохранить" в `UiLabPage.tsx` -> `fetch` запрос отправляется на `localhost:3001/save-tokens` -> сервер перезаписывает `tokens.json` -> ваш React-приложение (если запущено с HMR) автоматически перезагружается с новыми стилями.

## Этап 6: Визуальные манипуляторы (Handles)
**Задача:** Позволить пользователю изменять размеры и отступы элементов, перетаскивая их границы или углы прямо в `<iframe>`, как в графическом редакторе.

*   **Что сделать:**
    1.  **Обнаружение элементов:** В `<iframe>` нужно добавить скрипт, который при наведении на элемент (или при активации режима редактирования) будет отправлять его координаты и размеры в родительское окно (редактор).
    2.  **Оверлей с маркерами:** В `UiLabPage.tsx` создать компонент-оверлей, который будет позиционироваться *поверх* `<iframe>` и рисовать "ручки" (handles) для изменения размеров вокруг выбранного элемента.
    3.  **Логика перетаскивания:**
        *   При перетаскивании ручки, отслеживать движение мыши.
        *   Вычислять изменение размеров в пикселях.
        *   Преобразовывать это изменение в соответствующее значение токена (например, `padding-left`).
        *   Обновлять `liveTokens` в `UiLabPage.tsx` с новым значением.
*   **Пример логики (высокоуровнево, так как это сложный этап):**
    *   **В `<iframe>` (внедренный скрипт):**
        ```javascript
        // Этот скрипт должен быть внедрен в ваше основное приложение, когда оно загружается в iframe
        document.addEventListener('mouseover', (e) => {
          const target = e.target as HTMLElement;
          const dataTokenId = target.dataset.tokenId;
          if (dataTokenId && window.parent) {
            const rect = target.getBoundingClientRect();
            window.parent.postMessage({
              type: 'UI_LAB_HIGHLIGHT',
              dataTokenId,
              rect: {
                x: rect.x, y: rect.y, width: rect.width, height: rect.height
              }
            }, '*');
          }
        });
        ```
    *   **В `UiLabPage.tsx` (компонент `ResizableOverlay`):**
        *   Будет получать `rect` и `dataTokenId` из `iframe` через `window.addEventListener('message')`.
        *   Отображать `div` с `position: absolute` и `top, left, width, height` из `rect`.
        *   Внутри этого `div` будут маленькие `div`'ы по углам и сторонам, которые будут слушать события `mousedown`, `mousemove`, `mouseup` для изменения размеров.
        *   При изменении размеров, вычислять новое значение токена (например, `padding-left: 20px` -> `spacing-md: 20px`) и вызывать `setLiveTokens`.
*   **За что отвечает:**
    *   **Максимальная наглядность:** Пользователь видит и чувствует изменения напрямую.
    *   **Интуитивность:** Позволяет "играть" с размерами, как в Figma или других дизайн-инструментах.

<!-- PROMPT: Реализуй базовую логику для Этапа 6: Визуальные манипуляторы. Включи пример скрипта для внедрения в `<iframe>` для отправки координат элементов и компонент `ResizableOverlay` в `UiLabPage.tsx` для отображения и обработки перетаскивания. -->

---

## Итоговый вид системы:
Представь себе окно браузера, разделенное на три основные части:

1.  **Левая панель (Library / Навигация):**
    *   **Назначение:** Позволяет быстро переключаться между различными страницами приложения или просматривать отдельные компоненты в изоляции.
    *   **Содержимое:**
        *   Поле поиска для компонентов/страниц.
        *   Дерево или список сгруппированных элементов:
            *   `[+] Atoms` (например, Button, Input, Icon)
            *   `[+] Molecules` (например, SearchBar, Card, ModalHeader)
            *   `[+] Organisms` (например, Navigation, UserProfileWidget)
            *   `[+] Pages` (например, HomePage, LoginPage, ProductDetails)

2.  **Центральная зона (Stage / Canvas):**
    *   **Назначение:** Здесь отображается ваше основное приложение (или выбранный компонент) в реальном времени. Это "холст" для визуального редактирования.
    *   **Содержимое:**
        *   `<iframe>`, внутри которого загружено ваше приложение.
        *   **Оверлей с линейками и направляющими:** При наведении на элементы, будут появляться линейки и подсказки с размерами и отступами (как в Chrome DevTools).
        *   **Визуальные манипуляторы (Handles):** При выборе элемента, вокруг него появляются "ручки", за которые можно тянуть, чтобы изменить его размеры, отступы или радиус скругления.

3.  **Правая панель (Inspector / Панель свойств Leva):**
    *   **Назначение:** Содержит все интерактивные элементы управления (ползунки, пипетки, выпадающие списки) для настройки стилей.
    *   **Содержимое:**
        *   **Аккордеоны (сворачиваемые секции) для категорий стилей:**
            *   `[+] Colors`: Цветовые пипетки для `primary`, `secondary`, `background`, `text` и т.д.
            *   `[+] Spacing`: Слайдеры для `padding` и `margin` (отдельно для Top, Right, Bottom, Left), а также для `gap` в Flexbox/Grid.
            *   `[+] Typography`: Выпадающие списки для `font-family`, ползунки для `font-size`, `line-height`, `letter-spacing`, `font-weight`.
            *   `[+] Border & Radius`: Слайдеры для `border-width`, `border-radius` (возможно, отдельно для каждого угла).
            *   `[+] Shadows`: Визуальный конструктор теней с возможностью добавления нескольких слоев (X, Y, Blur, Spread, Color).
        *   **Кнопка "💾 Применить изменения к коду":** Отправляет текущие `liveTokens` на Node.js сервер для сохранения в `tokens.json`.

## Чек-лист для реализации (Junior friendly):
- [ ] **Этап 1: Design Tokens**
    - [ ] Создан файл `src/styles/tokens.json` с базовой структурой.
    - [ ] Все "магические числа" (цвета, отступы, размеры) в вашем CSS/Styled Components/Tailwind заменены на ссылки на CSS-переменные (например, `var(--colors-primary)`).

- [ ] **Этап 2: ThemeProvider**
    - [ ] Создан файл `src/components/StyleRegistry.tsx`.
    - [ ] В `StyleRegistry.tsx` реализована функция `applyTokensToCSS`, которая рекурсивно обходит объект токенов и устанавливает CSS-переменные на `document.documentElement`.
    - [ ] `StyleRegistry` использует `useEffect` для применения токенов при монтировании и при изменении `dynamicTokens`.
    - [ ] Ваше основное приложение (например, `src/App.tsx`) обернуто в `<StyleRegistry dynamicTokens={currentTokens}>`.

- [ ] **Этап 3: Интерфейс Редактора**
    - [ ] Установлена библиотека `Leva` (`npm install leva`).
    - [ ] Создана новая страница/роут `/ui-lab` (например, `src/pages/UiLabPage.tsx`).
    - [ ] На странице `/ui-lab` размещен `<iframe>`, который загружает ваше основное приложение (например, `http://localhost:3000`).
    - [ ] В `UiLabPage.tsx` используется хук `useControls` из `Leva` для создания интерактивных элементов управления (цветовые пипетки, слайдеры) для всех токенов из `tokens.json`.
    - [ ] Реализована синхронизация между `levaControls` и состоянием `liveTokens` в `UiLabPage.tsx`.

- [ ] **Этап 4: Инспектор "Наведи и нажми"**
    - [ ] В основных компонентах приложения добавлены атрибуты `data-token-id` (например, `<button data-token-id="colors-primary">`).
    - [ ] В `UiLabPage.tsx` добавлен `useEffect` для прослушивания сообщений из `<iframe>`.
    - [ ] В `<iframe>` внедрен скрипт, который при клике на элемент с `data-token-id` отправляет сообщение в родительское окно.
    - [ ] При получении сообщения, `Leva.focus()` используется для автоматического скролла к соответствующему контролу.

- [ ] **Этап 5: Сохранение в код**
    - [ ] Создана папка `scripts` в корне проекта и файл `scripts/sync-server.js`.
    - [ ] Установлены `express` и `cors` (`npm install express cors`).
    - [ ] В `sync-server.js` реализован Express-сервер, который слушает `POST` запросы на `/save-tokens`.
    - [ ] Сервер использует `fs.writeFileSync` для перезаписи `src/styles/tokens.json` данными из запроса.
    - [ ] В `UiLabPage.tsx` добавлена кнопка "Сохранить изменения в код", которая отправляет `fetch` запрос на `http://localhost:3001/save-tokens` с текущими `liveTokens`.

- [ ] **Этап 6: Визуальные манипуляторы (Опционально, для продвинутых)**
    - [ ] (Если решишься) Реализован механизм для обнаружения элементов в `<iframe>` и отображения ресайзеров.
    - [ ] (Если решишься) Реализована логика перетаскивания ручек и обновления соответствующих токенов.

---
**Важно:** Этот инструмент работает только на `localhost`. В финальную версию сайта (production) он не попадает.

## Итог
В результате выполнения всех этих шагов, ты получишь мощный инструмент, который позволит:
*   **Визуально настраивать UI:** Изменять цвета, шрифты, отступы и другие стили, используя удобные графические контролы.
*   **Мгновенно видеть изменения:** Благодаря `StyleRegistry` и `Leva`, все изменения будут применяться в реальном времени.
*   **Сохранять изменения в код:** Автоматически обновлять `tokens.json` в проекте, устраняя рутину.
*   **Ускорить разработку и дизайн:** Дизайнеры смогут экспериментировать со стилями без участия разработчиков, а разработчики — быстро применять изменения.

---
**Приблизительный стек для реализации:**
- **Frontend:** React + Vite (для быстрой сборки).
- **Контроллеры:** Leva — идеальная библиотека для создания панелей управления свойствами.
- **Стилизация:** CSS Variables + Styled Components (или Tailwind для маппинга классов).
- **Backend (Local):** Express (для записи изменений в файлы проекта).
```

Этот план описывает создание полноценного визуального конфигуратора. Если ваш проект использует библиотеку вроде Tailwind, это можно реализовать через изменение конфигурации `tailwind.config.js` в реальном времени. Если используется чистый CSS или Styled Components — через CSS Variables.

Как вы считаете, какой из этих пунктов наиболее критичен для вашего текущего процесса разработки?

<!--
[PROMPT_SUGGESTION]Напиши пример кода для ThemeProvider, который будет поддерживать динамическое изменение CSS переменных из этого редактора[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Как лучше всего организовать экспорт измененных настроек обратно в проект, чтобы это было безопасно?[/PROMPT_SUGGESTION]
