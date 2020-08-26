const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey');
const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


module.exports = app => {

    app.post('/api/surveys', requireLogin, requireCredits, (req,res) => {
        const {title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email)=>{ return {email:email.trim()}}),
            _user:req.user.id,
            dateSent: Date.now()
        });

        // send email before saving survey in db

        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send()
        .then(() => {
            console.log('Message sent')
          }).catch((error) => {
            console.log(error.response.body)})

    })


}