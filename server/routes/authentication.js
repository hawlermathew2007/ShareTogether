const express =  require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const router = express.Router()

const getUserById = async (id) => {
    return await User.findById(id)
}

passport.use(new localStrategy(
    async function(username, password, done) {
        const user = await User.findOne({ name: username })
        if (user == null) { return done(null, false, { message: 'No user with that name' }); }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else{
                return done(null, false, { message: 'Password incorrect!' })
            }
        } catch(e) {
            return done(e)
        }
    }
));
passport.serializeUser( (user, done) => done(null, user.id) )   // add the user id to the session
passport.deserializeUser( (id, done) => {
    return done(null, getUserById(id))  // get the full information about the user from session and pass it to req.user
})  

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
        if (err) { 
            return res.json({error: err}) 
        }
        if(info && info.message != null){
            return res.json({error: info.message})
        }
        req.logIn(user, function(err) {
            if (err) { 
              return res.json({error: err})
            }
            console.log('sucess', req.session.passport.user)
            return res.json(req.session.passport.user)
        });
    })(req, res, next);
})

router.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = new User({
            name: req.body.username,
            password: hashedPassword,
            birthday: req.body.birthday
        })
        const users = await User.find({})
        if(users != null && users.some((user) => user.name == req.body.username)){
            res.json({error: 'Someone already have this name!'})
            return 
        }
        await user.save()
        res.json({})
        return
    } catch (e){
        res.json({error: 'Oh no an Error occurs. Please try again!'})
        return
    }
})

module.exports = router