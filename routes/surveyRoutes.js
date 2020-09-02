const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url') // part of nodejs
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

    app.post('/api/surveys/webhooks', (req,res)=>{
        
        const p = new Path('/api/surveys/:surveyId/:choice')

        const events = _.chain(req.body) 
          .map((event)=>{
            const pathname = new URL(event.url).pathname
            const match = p.test(pathname);
            // remove data if above pattern is not found
            if (match){
                return {
                        email:event.email, 
                        surveyId: match.surveyId,
                        choice:match.choice
                    }
                }
            })
            .compact() // remove undefined elements (where no match found)
            .uniqBy( 'email','surveyId') // find unique records with email and surveyId 
            .value(); // get final array

        console.log(events)
        
        res.send({}) // respond back to sendGrid
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