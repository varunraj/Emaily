const express = require('express') 

const app = express();

console.log(app.get)


app.get('/',(req, res)=>{
    res.send({hi:'Varun'})
})


// Inject port as env variable.In the heroku deployment, it is assigned
// by env variable. In local, we will use 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);