const heroImage = require('./heroImage');
const eyebrow = require('./eyebrow');
const title = require('./title');
const subtitle = require('./subtitle');
const languageSwitcher = require('./languageSwitcher');
const navigationButtons = require('./navigationButtons');
const text = require('./text');
const card = require('./card');
const link = require('./link');
const quiz = require('./quiz');
const checklist = require('./checklist');
const image = require('./image');
const gif = require('./gif');
const spacerDivider = require('./spacerDivider');
const video = require('./video');
const timer = require('./timer');

const contentHandlers = {
  heroImage,
  eyebrow,
  title,
  subtitle,
  languageSwitcher,
  navigationButtons,
  text,
  card,
  link,
  quiz,
  checklist,
  image,
  gif,
  spacerDivider,
  video,
  timer,
};

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
  quiz: 'quiz',
  image: 'image',
  squareimage: 'image',
  gif: 'gif',
  video: 'video',
  videocontainer: 'video',
  spacer: 'spacerDivider',
  spacerdivider: 'spacerDivider',
  checklist: 'checklist',
  чеклист: 'checklist',
  таймер: 'timer',
  timer: 'timer',
};

module.exports = {
  contentHandlers,
  typeMap,
};
