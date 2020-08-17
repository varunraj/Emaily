const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys');
const User = require('../models/User')

// create a cookie from user. user in callback below is the
// user from calllback inside passport.use. The one with which 'done' is called
passport.serializeUser((user,done)=>{
    // user.id below is the _id primary key in mongo
    done(null, user.id);
})

// revert from cookie to user. id is mongo primary id
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleSecret,
            callbackURL: '/auth/google/callback'
         },
         // this where we get user profile details
         (accessToken, refreshToken, profile, done)=> { 
               User.findOne({googleId:profile.id})
               .then((exisitingUser)=>{
                    if (exisitingUser){
                        // we already have user
                        // tell done function we are done.
                        done(null,exisitingUser)
                    } else {
                        new User({googleId:profile.id}).save()
                        // tell done once promose is finished
                        .then((user)=> done(null, user));
                    }
                  }
                )

         }
        
         )
);
