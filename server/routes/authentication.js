const express =  require('express')
const {v4 : uuidv4} = require('uuid')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router()

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({    
            googleId: profile.id,
            name: profile.displayName,
            password: await bcrypt.hash(uuidv4(), 10)
          });   
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
  }
));

passport.serializeUser((user, done) => {
    console.log('Serializing user')
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user:', user);
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/loginGg/failed' }),    
    function (req, res) {
        req.session.save(function(err) {
            res.redirect('http://localhost:5173/')
        });
    }
);

router.get('/loginGg/success', async (req, res) => {
    try{
        if (JSON.stringify(req?.sessionStore?.sessions) != '{}' && req.sessionStore.sessions != null){
            const user = await User.findById(JSON.parse(req?.sessionStore?.sessions[Object.keys(req.sessionStore.sessions)[0]]).passport?.user)
            res.json(user)
            return
        }
        console.log('Go to Login page')
        res.redirect('http://localhost:5173/authentication/login')
    } catch(e) {
        console.log(e)
        res.json({error: 'Oh no Google hate you :('})
    }
})

router.get('/loginGg/failed', (req, res) => {
    res.status(403).redirect('http://localhost:5173/userInfo/error')
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
        if (err) {
            return next(err);
        }
        if(info && info.message != null){
            return res.json({error: info.message});
        }
            req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.json(req.session.passport.user);
            });
        });
    })(req, res, next);
});

router.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
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