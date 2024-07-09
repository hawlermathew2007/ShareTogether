if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const authenticationRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
const app = express()

app.use(cors())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false })) // let us get the information from the form
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(session({ // allow the user to persist across the page
    secret: process.env.SESSION_SECRET,
    resave: false, // should we resave our section variable? if nothing has changed then false
    saveUninitialized: false // should we save an empty value in the session? if no value then dont save
}))
app.use(flash())
app.use(cookieParser())
app.use(passport.session())
app.use(passport.initialize())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
// when making web with non deploy then just connect with local MongoDB else then it will be the server on the web somewhere
const db = mongoose.connection
db.on('error',  error => console.error(error))
db.once('open',  () => console.log('Connected to mongoose'))

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.json({})
})

app.use('/', authenticationRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT || 3000, () => console.log('Listening'))