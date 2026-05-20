const fs = require('fs');
const path = require('path');

// Получить дату в формате YYYY-MM-DD_HH-MM-SS
function getTimestamp() {
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

// Рекурсивное удаление папок
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// Скопировать файл
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Основная функция восстановления
function restoreFromBackup() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('❌ Ошибка: укажите путь к папке бекапа\n');
    console.log('Использование:');
    console.log('  npm run restore <путь_к_бекапу>\n');
    console.log('Пример:');
    console.log('  npm run restore ../na_mi_pmu_2026-05-07');
    process.exit(1);
  }

  const backupPath = path.resolve(args[0]);
  const currentDir = process.cwd();
  const timestamp = getTimestamp();

  // Проверить что бекап существует
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ Папка бекапа не найдена: ${backupPath}`);
    process.exit(1);
  }

  console.log('🔄 Начинаем восстановление из бекапа...\n');
  console.log(`📁 Текущий проект: ${currentDir}`);
  console.log(`💾 Восстанавливаем из: ${backupPath}\n`);

  // ШАГ 1: Создать резервную копию текущего кода
  console.log('📋 ШАГ 1: Создаём резервную копию текущего кода...');
  const backupDir = path.join(currentDir, `_backup_before_restore_${timestamp}`);
  fs.mkdirSync(backupDir, { recursive: true });

  const itemsToBackup = ['src', 'assets', 'scripts'];
  itemsToBackup.forEach(item => {
    const srcPath = path.join(currentDir, item);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(backupDir, item);
      copyDir(srcPath, destPath);
      console.log(`  ✅ Сохранена резервная копия: ${item}`);
    }
  });
  console.log(`  📂 Резервная копия сохранена в: _backup_before_restore_${timestamp}\n`);

  // ШАГ 2: Удалить старые папки
  console.log('🗑️  ШАГ 2: Удаляем старые папки...');
  itemsToBackup.forEach(item => {
    const targetPath = path.join(currentDir, item);
    if (fs.existsSync(targetPath)) {
      removeDir(targetPath);
      console.log(`  ✅ Удалена: ${item}`);
    }
  });
  console.log();

  // ШАГ 3: Копировать из бекапа
  console.log('📥 ШАГ 3: Копируем файлы из бекапа...');
  
  itemsToBackup.forEach(item => {
    const srcPath = path.join(backupPath, item);
    const destPath = path.join(currentDir, item);
    
    if (fs.existsSync(srcPath)) {
      copyDir(srcPath, destPath);
      console.log(`  ✅ Восстановлена: ${item}`);
    } else {
      console.log(`  ⏭️  Пропущена (не найдена в бекапе): ${item}`);
    }
  });

  // Копировать важные файлы
  const filesList = ['package.json', 'app.json', 'tsconfig.json'];
  filesList.forEach(file => {
    const srcPath = path.join(backupPath, file);
    const destPath = path.join(currentDir, file);
    
    if (fs.existsSync(srcPath)) {
      copyFile(srcPath, destPath);
      console.log(`  ✅ Восстановлен: ${file}`);
    }
  });
  console.log();

  // ШАГ 4: Проверка целостности
  console.log('✅ ШАГ 4: Проверяем целостность восстановления...');
  const requiredItems = ['src', 'assets', 'scripts', 'package.json', 'app.json', 'tsconfig.json'];
  let allGood = true;

  requiredItems.forEach(item => {
    const itemPath = path.join(currentDir, item);
    if (fs.existsSync(itemPath)) {
      console.log(`  ✅ Найден: ${item}`);
    } else {
      console.log(`  ⚠️  ОТСУТСТВУЕТ: ${item}`);
      allGood = false;
    }
  });
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

// Запустить восстановление
try {
  restoreFromBackup();
} catch (error) {
  console.error('❌ Ошибка при восстановлении:', error.message);
  process.exit(1);
}
