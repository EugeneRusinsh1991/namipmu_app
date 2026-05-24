const fs = require('fs');
const path = require('path');
const { DIRECTORIES_TO_BACKUP, FILES_TO_BACKUP, REQUIRED_ITEMS } = require('../backupConfig');
const { copyDir, removeDir, copyFile, getTimestamp, ensureDirExists } = require('../utils/fs-tools');
const { validateRequiredItems } = require('./validator');

function restoreFromBackup(backupPathArg) {
  const currentDir = process.cwd();
  const timestamp = getTimestamp();
  let backupPath = backupPathArg;

  if (!backupPath) {
    throw new Error('Путь к папке бекапа не указан');
  }

  if (!path.isAbsolute(backupPath)) {
    backupPath = path.resolve(backupPath);
  }

  if (!fs.existsSync(backupPath)) {
    throw new Error(`Папка бекапа не найдена: ${backupPath}`);
  }

  console.log('🔄 Начинаем восстановление из бекапа...\n');
  console.log(`📁 Текущий проект: ${currentDir}`);
  console.log(`💾 Восстанавливаем из: ${backupPath}\n`);

  console.log('📋 ШАГ 1: Создаём резервную копию текущего кода...');
  const backupDir = path.join(currentDir, `_backup_before_restore_${timestamp}`);
  ensureDirExists(backupDir);

  DIRECTORIES_TO_BACKUP.forEach((item) => {
    const srcPath = path.join(currentDir, item);
    if (require('fs').existsSync(srcPath)) {
      const destPath = path.join(backupDir, item);
      copyDir(srcPath, destPath);
      console.log(`  ✅ Сохранена резервная копия: ${item}`);
    }
  });
  console.log(`  📂 Резервная копия сохранена в: _backup_before_restore_${timestamp}\n`);

  console.log('🗑️  ШАГ 2: Удаляем старые папки...');
  DIRECTORIES_TO_BACKUP.forEach((item) => {
    const targetPath = path.join(currentDir, item);
    if (require('fs').existsSync(targetPath)) {
      removeDir(targetPath);
      console.log(`  ✅ Удалена: ${item}`);
    }
  });
  console.log();

  console.log('📥 ШАГ 3: Копируем файлы из бекапа...');
  DIRECTORIES_TO_BACKUP.forEach((item) => {
    const srcPath = path.join(backupPath, item);
    const destPath = path.join(currentDir, item);

    if (require('fs').existsSync(srcPath)) {
      copyDir(srcPath, destPath);
      console.log(`  ✅ Восстановлена: ${item}`);
    } else {
      console.log(`  ⏭️  Пропущена (не найдена в бекапе): ${item}`);
    }
  });

  FILES_TO_BACKUP.forEach((file) => {
    const srcPath = path.join(backupPath, file);
    const destPath = path.join(currentDir, file);

    if (require('fs').existsSync(srcPath)) {
      copyFile(srcPath, destPath);
      console.log(`  ✅ Восстановлен: ${file}`);
    }
  });
  console.log();

  console.log('✅ ШАГ 4: Проверяем целостность восстановления...');
  const allGood = validateRequiredItems(REQUIRED_ITEMS, currentDir);
  console.log();

  if (allGood) {
    console.log('✨ Восстановление успешно завершено!\n');
    console.log('📝 Следующие шаги:');
    console.log('  1. Установите зависимости: npm install');
    console.log('  2. Проверьте проект: npm run lint');
    console.log('  3. Запустите приложение: npm start');
    console.log();
    console.log(`📂 Резервная копия старых файлов: _backup_before_restore_${timestamp}`);
    console.log('   (можно удалить если всё работает)\n');
  } else {
    console.error('❌ Что-то пошло не так! Проверьте ошибки выше.\n');
    console.log(`📂 Ваши старые файлы сохранены в: _backup_before_restore_${timestamp}`);
    console.log('   Восстановите их вручную если нужно.\n');
    process.exit(1);
  }
}

module.exports = {
  restoreFromBackup,
};
