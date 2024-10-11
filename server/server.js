if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const authenticationRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // let us get the information from the form
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24*60*60*100 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
// when making web with non deploy then just connect with local MongoDB else then it will be the server on the web somewhere
const db = mongoose.connection
db.on('error',  error => console.error(error))
db.once('open',  () => console.log('Connected to mongoose'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/logout', (req, res) => {
    console.log('logging out')
    req.session.destroy()
    res.json({})
})

app.get('/checkUser', (req, res) => {
    console.log('loading')
    console.log(req)
})

app.use('/', authenticationRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT || 3000, () => console.log('Listening'))