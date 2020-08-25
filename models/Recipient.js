const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
    email:String,
    responded: {type: Boolean, default:false}
    
})

// create a mongoose model schema binding

module.exports = recipientSchema;