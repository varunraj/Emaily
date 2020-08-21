
const passport = require('passport')

// wrap the routes using a function and pass app object to it.
// call below arrow function from index

module.exports = (app) => {

    // initiate authentication using passport in /auth/google endpoint
    app.get('/auth/google',
            passport.authenticate('google', {
                                                scope:['profile', 'email']
                                            })
    );

    // after passport middlware, send to next middleware
    app.get('/auth/google/callback',
            passport.authenticate('google'),
            (req,res)=> { 
                res.redirect('/surveys')
            }
            
    );


    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });
            
        

    app.get('/api/current_user',(req, res)=>{
        res.send(req.user)
    });

};