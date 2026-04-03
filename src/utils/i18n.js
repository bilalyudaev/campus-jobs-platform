const en = require('../locales/en.json');
const es = require('../locales/es.json');

const translations = { en, es };

function t(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}

module.exports = t;

