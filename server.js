const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messages = require('express-messages');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;


// === import Authentication Check ===

const checkAuth = require('./controller/auth');

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

app.use(cookieParser());

mongoose.set('useFindAndModify', false);


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



// === BRING IN MODELS ===

const User = require('./models/Users');

// === ROUTER files ===

const users = require('./routes/users');
app.use('/users', users);

const events = require('./routes/events');
app.use('/events', events)

const search = require('./routes/search');
app.use('/', search);

// === RENDER HOME PAGE ===

app.get('/', (req, res) => {
        res.render('index', {
        })

})

// ====== SERVER PORT ======

app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
})
