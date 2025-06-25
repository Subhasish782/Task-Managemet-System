const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireLogin } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Middleware:-
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Set up view engine:-
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session and Flash middleware:-
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.session && req.session.user ? req.session.user : null;
  next();
});

//Use routes
app.use(authRoutes); 
app.use('/', requireLogin, taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
})
.catch((err) => console.log(err));
