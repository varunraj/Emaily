const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema ({
    title: String,
    subject:String,
    body:String,
    recipients:[String]
    
})

// create a mongoose model schema binding
const Survey = mongoose.model('surveys', surveySchema);

module.exports = Survey;