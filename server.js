const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messages = require('express-messages');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

// === SETTING UP MONGODB CONNECTION ===
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.once('open', () => {
    console.log("Connected to MongoDB");
})
database.on('error', (err) => {
    console.error(err);
})

// ======== SETTING UP MIDDLEWARES ========

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// === Express SESSION Middleware ===

app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// === Express MESSAGES Middleware ===

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = messages(req, res);
    next();
})

// === PASSPORT CONFIG ===

require('./config/passport')(passport);

// === PASSPORT MIDDLEWARE === (this section has to be placed before MODELS and ROUTER)

app.use(passport.initialize());
app.use(passport.session());
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// === BRING IN MODELS ===

const User = require('./models/Users');

// === ROUTER files ===

const users = require('./routes/users');
app.use('/users', users);

// === RENDER HOME PAGE ===

app.get('/', (req, res) => {
    res.render('index', {
        
    });
})

// === SERVER PORT ===

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
