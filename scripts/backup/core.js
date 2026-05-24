const path = require('path');
const { ensureDirExists, copyDir, copyFile, getTimestamp } = require('../utils/fs-tools');
const fs = require('fs');

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
  '.vscode',
];

function createBackup() {
  const sourceDir = path.resolve(__dirname, '../..');
  const parentDir = path.dirname(sourceDir);
  const projectName = path.basename(sourceDir);
  const date = getTimestamp();
  const backupName = `${projectName}_${date}`;
  const backupPath = path.join(parentDir, backupName);

  console.log('🔄 Начинаем создание бекапа...\n');
  console.log(`📁 Исходная папка: ${sourceDir}`);
  console.log(`💾 Путь сохранения: ${backupPath}\n`);

  if (fs.existsSync(backupPath)) {
    console.log(`⚠️  Папка ${backupName} уже существует!`);
    return;
  }

  ensureDirExists(backupPath);

  const copiedItems = [];
  BACKUP_ITEMS.forEach((item) => {
    const srcPath = path.join(sourceDir, item);
    if (!fs.existsSync(srcPath)) {
      console.log(`⏭️  Пропущен (не найден): ${item}`);
      return;
    }

    const destPath = path.join(backupPath, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
      console.log(`✅ Скопирована папка: ${item}`);
    } else {
      copyFile(srcPath, destPath);
      console.log(`✅ Скопирован файл: ${item}`);
    }
    copiedItems.push(item);
  });

  const restoreReadme = `# 📋 Инструкция по восстановлению бекапа

## Информация о бекапе
- **Дата создания:** ${date}
- **Оригинальная папка:** ${projectName}
- **Скопировано:** ${copiedItems.join(', ')}

## ⚙️ Как восстановить проект

### Способ 1: Полное восстановление (если проект потерян)

1. **Скопируйте содержимое этой папки** в новую папку \`${projectName}\`:
   \`\`\`bash
   xcopy ${projectName}_${date}\\* ${projectName}\\ /E /I
   \`\`\`

2. **Перейдите в папку проекта:**
   \`\`\`bash
   cd ${projectName}
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
   xcopy ${projectName}_${date}\\src ${projectName}\\src /E /Y
   xcopy ${projectName}_${date}\\assets ${projectName}\\assets /E /Y
   xcopy ${projectName}_${date}\\scripts ${projectName}\\scripts /E /Y
   \`\`\`

2. **Обновите зависимости:**
   \`\`\`bash
   cd ${projectName}
   npm install
   \`\`\`

### Способ 3: На Mac/Linux

1. **Копирование:**
   \`\`\`bash
   cp -r ${projectName}_${date}/* ${projectName}/
   \`\`\`

2. **Установка и запуск:**
   \`\`\`bash
   cd ${projectName}
   npm install
   npm start
   \`\`\`

## ⚠️ Важно!

- **node_modules НЕ бекапиться** — создаётся автоматически через \`npm install\`
- **\`.expo\` и \`dist/\` НЕ бекапятся** — восстанавливаются автоматически
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

---
**Последний бекап:** ${date}
`;

  fs.writeFileSync(path.join(backupPath, 'RESTORE_README.md'), restoreReadme);
  console.log(`✅ Создан файл восстановления: RESTORE_README.md`);
  console.log(`\n✨ Бекап успешно создан!`);
  console.log(`📂 Папка: ${backupPath}`);
}

module.exports = {
  createBackup,
};
