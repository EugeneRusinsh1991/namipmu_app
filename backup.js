const fs = require('fs');
const path = require('path');

// Файлы и папки для бекапа
const BACKUP_ITEMS = [
  'src',
  'assets',
  'scripts',
  'package.json',
  'package-lock.json',
  'app.json',
  'tsconfig.json',
  'expo-env.d.ts',
  'README.md',
  '.gitignore',
  '.vscode'
];

// Получить дату и время в формате YYYY-MM-DD_HH-MM-SS
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

// Рекурсивное копирование папок
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Основная функция бекапа
function createBackup() {
  const sourceDir = __dirname;
  const parentDir = path.dirname(sourceDir);
  const projectName = path.basename(sourceDir);
  const date = getFormattedDate();
  const backupName = `${projectName}_${date}`;
  const backupPath = path.join(parentDir, backupName);

  console.log('🔄 Начинаем создание бекапа...\n');
  console.log(`📁 Исходная папка: ${sourceDir}`);
  console.log(`💾 Путь сохранения: ${backupPath}\n`);

  // Создать папку бекапа
  if (fs.existsSync(backupPath)) {
    console.log(`⚠️  Папка ${backupName} уже существует!`);
    return;
  }

  fs.mkdirSync(backupPath, { recursive: true });

  // Скопировать файлы и папки
  let copiedItems = [];
  BACKUP_ITEMS.forEach(item => {
    const srcPath = path.join(sourceDir, item);
    
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(backupPath, item);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
        console.log(`✅ Скопирована папка: ${item}`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Скопирован файл: ${item}`);
      }
      copiedItems.push(item);
    } else {
      console.log(`⏭️  Пропущен (не найден): ${item}`);
    }
  });

  // Создать README для восстановления
  const restoreReadme = `# 📋 Инструкция по восстановлению бекапа

## Информация о бекапе
- **Дата создания:** ${date}
- **Оригинальная папка:** na_mi_pmu
- **Скопировано:** ${copiedItems.join(', ')}

## ⚙️ Как восстановить проект

### Способ 1: Полное восстановление (если проект потерян)

1. **Скопируйте содержимое этой папки** в новую папку \`na_mi_pmu\`:
   \`\`\`bash
   xcopy na_mi_pmu_${date}\\* na_mi_pmu\\ /E /I
   \`\`\`

2. **Перейдите в папку проекта:**
   \`\`\`bash
   cd na_mi_pmu
   \`\`\`

3. **Установите зависимости:**
   \`\`\`bash
   npm install
   \`\`\`

4. **Запустите проект:**
   \`\`\`bash
   npm start
   \`\`\`

### Способ 2: Обновление существующего проекта

1. **Скопируйте только изменённые файлы:**
   \`\`\`bash
   xcopy na_mi_pmu_${date}\\src na_mi_pmu\\src /E /Y
   xcopy na_mi_pmu_${date}\\assets na_mi_pmu\\assets /E /Y
   xcopy na_mi_pmu_${date}\\scripts na_mi_pmu\\scripts /E /Y
   \`\`\`

2. **Обновите зависимости:**
   \`\`\`bash
   cd na_mi_pmu
   npm install
   \`\`\`

### Способ 3: На Mac/Linux

1. **Копирование:**
   \`\`\`bash
   cp -r na_mi_pmu_${date}/* na_mi_pmu/
   \`\`\`

2. **Установка и запуск:**
   \`\`\`bash
   cd na_mi_pmu
   npm install
   npm start
   \`\`\`

## ⚠️ Важно!

- **node_modules НЕ бекапиться** — создаётся автоматически через \`npm install\`
- **\`.expo\` и \`dist/\` НЕ бекапиться** — восстанавливаются автоматически
- **Перед восстановлением** убедитесь, что установлены:
  - Node.js (проверка: \`node --version\`)
  - npm (проверка: \`npm --version\`)

## 🔍 Проверка целостности

После восстановления проверьте:

1. **Структура папок:**
   \`\`\`bash
   dir src
   dir assets
   dir scripts
   \`\`\`

2. **Важные файлы:**
   \`\`\`bash
   type package.json
   type app.json
   \`\`\`

3. **Сборка:**
   \`\`\`bash
   npm run lint
   npm start
   \`\`\`

## 📞 Если что-то не работает

- Удалите \`node_modules\` и \`.expo\`: \`rm -r node_modules .expo\`
- Переустановите зависимости: \`npm install\`
- Очистите кеш: \`npm cache clean --force\`

---
**Последний бекап:** ${date}
`;

  fs.writeFileSync(path.join(backupPath, 'RESTORE_README.md'), restoreReadme);
  console.log(`✅ Создан файл восстановления: RESTORE_README.md`);

  console.log(`\n✨ Бекап успешно создан!`);
  console.log(`📂 Папка: ${backupPath}`);
  console.log(`📊 Размер: проверьте через "Свойства" папки`);
}

// Запустить бекап
try {
  createBackup();
} catch (error) {
  console.error('❌ Ошибка при создании бекапа:', error.message);
  process.exit(1);
}
