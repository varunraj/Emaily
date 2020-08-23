const express = require('express') 
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys');

require('./services/passport')// directly execute all code from file

mongoose.connect(keys.mongoURI);

const app = express();

// we need body parser middeleware to get data from post req.
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);



// Inject port as env variable.In the heroku deployment, it is assigned
// by env variable. In local, we will use 5000

const PORT = process.env.PORT || 5000
app.listen(PORT);




