const mongoose = require('mongoose');
const { Schema } = mongoose;

// create the schema for user collection
const userSchema = new Schema ({
    googleId: String,
    credits: { type: Number, default: 0 }
})

// create a mongoose model schema binding
const User = mongoose.model('users', userSchema);

module.exports = User;