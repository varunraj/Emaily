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
            callbackURL: '/auth/google/callback',
            proxy:true // this is to fix proxy issue with heroku (video 56)
         },
         // this where we get user profile details
         async (accessToken, refreshToken, profile, done)=> { 
               const exisitingUser = await User.findOne({googleId:profile.id})
               if (exisitingUser){
                    // we already have user
                    // tell done function we are done.
                    done(null,exisitingUser)
                } else {
                    const user = await new User({googleId:profile.id}).save()
                    // tell done once promose is finished
                    done(null, user);
                    }
                  }
                )
         
);
