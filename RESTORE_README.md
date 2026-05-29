# 📋 Инструкция по восстановлению бекапа

## Информация о бекапе
- **Дата создания:** 2026-05-29_15-29-24
- **Оригинальная папка:** na_mi_pmu
- **Скопировано:** src, assets, scripts, package.json, package-lock.json, app.json, tsconfig.json, expo-env.d.ts, README.md, .gitignore, .vscode

## ⚙️ Как восстановить проект

### Способ 1: Полное восстановление (если проект потерян)

1. **Скопируйте содержимое этой папки** в новую папку `na_mi_pmu`:
   ```bash
   xcopy na_mi_pmu_2026-05-29_15-29-24\* na_mi_pmu\ /E /I
   ```

2. **Перейдите в папку проекта:**
   ```bash
   cd na_mi_pmu
   ```

3. **Установите зависимости:**
   ```bash
   npm install
   ```

4. **Запустите проект:**
   ```bash
   npm start
   ```

### Способ 2: Обновление существующего проекта

1. **Скопируйте только изменённые файлы:**
   ```bash
   xcopy na_mi_pmu_2026-05-29_15-29-24\src na_mi_pmu\src /E /Y
   xcopy na_mi_pmu_2026-05-29_15-29-24\assets na_mi_pmu\assets /E /Y
   xcopy na_mi_pmu_2026-05-29_15-29-24\scripts na_mi_pmu\scripts /E /Y
   ```

2. **Обновите зависимости:**
   ```bash
   cd na_mi_pmu
   npm install
   ```

### Способ 3: На Mac/Linux

1. **Копирование:**
   ```bash
   cp -r na_mi_pmu_2026-05-29_15-29-24/* na_mi_pmu/
   ```

2. **Установка и запуск:**
   ```bash
   cd na_mi_pmu
   npm install
   npm start
   ```

## ⚠️ Важно!

- **node_modules НЕ бекапиться** — создаётся автоматически через `npm install`
- **`.expo` и `dist/` НЕ бекапятся** — восстанавливаются автоматически
- **Перед восстановлением** убедитесь, что установлены:
  - Node.js (проверка: `node --version`)
  - npm (проверка: `npm --version`)

## 🔍 Проверка целостности

После восстановления проверьте:

1. **Структура папок:**
   ```bash
   dir src
   dir assets
   dir scripts
   ```

2. **Важные файлы:**
   ```bash
   type package.json
   type app.json
   ```

3. **Сборка:**
   ```bash
   npm run lint
   npm start
   ```

---
**Последний бекап:** 2026-05-29_15-29-24
