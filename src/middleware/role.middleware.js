const t = require('../utils/i18n');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: t(req.lang || 'en', 'forbidden') });
    }

    next();
  };
};

