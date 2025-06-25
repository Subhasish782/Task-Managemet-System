exports.requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.locals.currentUser = req.session.username;
  next();
};