const { parseLocalizedText, parseImagePair, parseVideoPair, parseImageSizing } = require('./parsers');

const typeMap = {
  heroimage: 'heroImage',
  eyebrow: 'eyebrow',
  title: 'title',
  subtitle: 'subtitle',
  languageswitcher: 'languageSwitcher',
  navigationbuttons: 'navigationButtons',
  text: 'text',
  list: 'list',
  card: 'card',
  cardbig: 'card',
  cardsmall: 'card',
  link: 'link',
  textlink: 'link',
  image: 'image',
  squareimage: 'image',
  gif: 'gif',
  video: 'video',
  videocontainer: 'video',
};

const contentHandlers = {
  heroImage(row, sheetName) {
    const res = { ...parseImageSizing(row) };
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    return res;
  },

  eyebrow(row) {
    return { text: parseLocalizedText(row) };
  },

  title(row) {
    return { text: parseLocalizedText(row) };
  },

  subtitle(row) {
    return { text: parseLocalizedText(row) };
  },

  languageSwitcher() {
    return {};
  },

  navigationButtons(row) {
    const nextText = parseLocalizedText(row);
    const res = {
      backText: {
        ru: 'Назад',
        ua: 'Назад',
        eng: 'Back',
        ger: 'Zurück',
      },
      backHref: '/',
      nextText,
    };
    if (row.href) res.href = row.href;
    return res;
  },

  text(row) {
    return { text: parseLocalizedText(row) };
  },

  card(row, sheetName, context = {}) {
    const res = {};
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    res.title = parseLocalizedText(row);
    res.description = parseLocalizedText(row, 'sub');
    if (context.normalizedType === 'cardbig') res.size = 'big';
    if (context.normalizedType === 'cardsmall') res.size = 'small';
    if (row.href) res.href = row.href;
    return res;
  },

  link(row) {
    return {
      text: parseLocalizedText(row),
      ...(row.href ? { href: row.href } : {}),
    };
  },

  image(row, sheetName) {
    const res = { ...parseImageSizing(row) };
    const srcPair = parseImagePair(row, sheetName, ['image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  gif(row, sheetName) {
    const res = { ...parseImageSizing(row) };
    const srcPair = parseImagePair(row, sheetName, ['gif', 'image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  video(row, sheetName) {
    const res = { ...parseImageSizing(row) };
    const srcPair = parseVideoPair(row, sheetName, ['video']);
    if (srcPair) {
      res.src = srcPair;
      return res;
    }

    const url = row.href || row.ukr || row.rus || row.eng || row.ger;
    res.url = url && String(url).trim()
      ? String(url).trim()
      : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    return res;
  },
};

module.exports = {
  contentHandlers,
  typeMap,
};

