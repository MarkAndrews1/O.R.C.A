const { UnauthorizedError } = require('../expressError');

const isAdmin = (req, res, next) => {
  const isAdmin = req.provider && req.provider.admin;
  if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
  }
  return next();
};

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.provider) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { isAdmin, ensureLoggedIn };
