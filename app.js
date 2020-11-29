const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const cookieParser = require('cookie-parser');
const messages = require('express-messages');
const flash = require('connect-flash');
require('dotenv').config();

// === IMPORT ALL ROUTES ===

const usersRoutes = require('./routes/users');
const eventsRoutes = require('./routes/events');
const commentsRoutes = require('./routes/comments');

// === SETTING UP MONGODB CONNECTION ===

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.once('open', () => {
    console.log("Connected to MongoDB");
})
database.on('error', (err) => {
    console.error(err);
})
mongoose.set('useFindAndModify', false);

// ======== SETTING UP MIDDLEWARES ========

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(express.json());

// === Express MESSAGES Middleware ===

app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = messages(req, res);
    next();
})

// === Express SESSION Middleware === (must be placed before PASSPORTJS)

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}))

// === PASSPORT CONFIG ===

require('./config/passport')(passport);

// === PASSPORT MIDDLEWARE === (this section has to be placed before MODELS and ROUTER)

app.use(passport.initialize());
app.use(passport.session());
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// === ROUTER files ===

app.use('/users', usersRoutes);
app.use('/events', eventsRoutes)
app.use('/comments', commentsRoutes);

// === RENDER HOME PAGE ===

app.get('/', (req, res) => {
    res.render('index', {})
})


module.exports = app;