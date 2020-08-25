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
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email)
        } )
    }


}

module.exports = Mailer;