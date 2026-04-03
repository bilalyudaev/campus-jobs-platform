module.exports = (req, res, next) => {
  const queryLang = req.query.lang;
  const headerLang = req.headers['accept-language'];

  const supportedLanguages = ['en', 'es'];
  let lang = 'en';

  if (queryLang && supportedLanguages.includes(queryLang)) {
    lang = queryLang;
  } else if (headerLang) {
    const shortLang = headerLang.split(',')[0].split('-')[0];
    if (supportedLanguages.includes(shortLang)) {
      lang = shortLang;
    }
  }

  req.lang = lang;
  next();
};
