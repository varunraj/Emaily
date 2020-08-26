const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey');
const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


module.exports = app => {

    // redirect for yes/no click

    app.get('/api/surveys/thanks', (req,res)=>{
        res.send("Thank you for your feedack !")
    })



    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
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
        

        try{ 
            await mailer.send();
            await survey.save();
            req.user.credits -=1;
            const user = await req.user.save();
            res.send(user);

        } catch(err){
            res.status(422).send(err)
        }

    })


}