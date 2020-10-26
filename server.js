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
const fetch = require('node-fetch');

const RequestIp = require('@supercharge/request-ip')






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
// === RENDER HOME PAGE ===

app.get('/', (req, res) => {
        res.render('index', {
        })

})

// =========== SEARCH

app.get('/search', (req, res) => {
    const ip = RequestIp.getClientIp(req)
    console.log(ip)
    res.render('search', {
        
    })
})

app.post('/search', async (req, res) => {
    let api = "https://api.seatgeek.com/2/performers?q="
    let search_query = req.body.search_query;
    let client_id = '&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2';


    const response = await fetch(api + search_query + "&per_page=20" + client_id);

    const data = await response.json();

})

// ===========



// ====== SERVER PORT ======

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
