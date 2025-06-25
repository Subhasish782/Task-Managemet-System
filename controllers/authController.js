const User = require('../models/userModel');

exports.renderLogin = (req, res) => {
  res.render('auth/login', { error: req.flash('error') });
};

exports.renderRegister = (req, res) => {
  res.render('auth/register', { error: req.flash('error') });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) {
    req.flash('error', 'Username already exists');
    return res.redirect('/register');
  }
  await User.create({ username, password });
  res.redirect('/login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }
  req.session.userId = user._id;
  req.session.username = user.username;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
