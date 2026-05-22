const { parseLocalizedText, parseImagePair, parseImageSizing } = require('./parsers');

// Карта обработчиков типов контента
const contentHandlers = {
  heroimage(row, sheetName) {
    const sizing = parseImageSizing(row);
    const res = Object.assign({}, sizing);
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    return res;
  },

  eyebrow(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },
  title(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },
  subtitle(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },

  languageswitcher() {
    return {}; // просто элемент без дополнительных полей
  },

  navigationbuttons(row) {
    const nextText = {
      ru: row.ru || 'Следующий урок',
      ua: row.ua || 'Наступний урок',
    };
    const res = {
      backText: { ru: 'Назад', ua: 'Назад' },
      backHref: '/',
      nextText,
    };
    if (row.href) res.href = row.href;
    return res;
  },

  text(row) {
    return { text: parseLocalizedText(row) };
  },

  // card, cardBig, cardSmall handled as `card`
  card(row, sheetName) {
    const res = {};
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    res.title = parseLocalizedText(row, 'title');
    res.description = parseLocalizedText(row, 'description');
    if (row.href) res.href = row.href;
    return res;
  },

  link(row) {
    return {
      text: { ua: row.ua || '', ru: row.ru || '' },
      ...(row.href ? { href: row.href } : {}),
    };
  },

  image(row, sheetName) {
    const res = {};
    const sizing = parseImageSizing(row);
    Object.assign(res, sizing);
    const srcPair = parseImagePair(row, sheetName, ['image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  gif(row, sheetName) {
    const res = {};
    const sizing = parseImageSizing(row);
    Object.assign(res, sizing);
    const srcPair = parseImagePair(row, sheetName, ['gif', 'image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  // textLink -> link
  textlink(row) {
    return {
      text: { ua: row.ua || row.uaText || '', ru: row.ru || row.ruText || '' },
      ...(row.href ? { href: row.href } : {}),
    };
  },

  // videoContainer -> video
  videocontainer(row) {
    const res = {};
    if (row.imageRU || row.imageUA) {
      res.url = row.imageRU || row.imageUA;
    }
    return res;
  },

  video(row) {
    const res = {};
    if (row.href) res.url = row.href;
    return res;
  },
};

// Алиасы типов (чтобы, например, cardBig и cardSmall обрабатывались как card)
const typeAliases = {
  cardbig: 'card',
  cardsmall: 'card',
  squareimage: 'image',
  textlink: 'textlink',
  videocontainer: 'videocontainer',
};

module.exports = {
  contentHandlers,
  typeAliases,
};
