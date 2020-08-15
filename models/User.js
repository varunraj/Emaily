const mongoose = require('mongoose');
const { Schema } = mongoose;

// create the schema for user collection
const userSchema = new Schema ({
    googleId: String
})

// create a mongoose model schema binding
mongoose.model('users', userSchema);