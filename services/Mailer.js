const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
const recipientSchema = require('../models/Recipient');


class Mailer extends helper.Mail {
    constructor({subject, recipients},content){
        super();
        this.from_email = new helper.Email("varunraj82@gmail.com");
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipientSchema);
 
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email)
        } )
    }

    // replace links behind yes, no button with sendgrid links for each user
    addClickTracking(){

        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true)
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }



}

module.exports = Mailer;