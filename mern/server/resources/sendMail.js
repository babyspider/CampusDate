/**
* This file contains the function that sends the email to the new user
* It also checks the email sends is sent from the server
*/

const {email_host, email_user, email_pass} = require('./config.json');
const nodemailer = require("nodemailer");

module.exports = {
    name:           'sendMail',
    description:    'Given arguments, this should send an email to the desired address via the email listed in config.json',
    active:         true,
    usage:          `Object.sendMail(recipient,subject,body)`,
    async execute(recipient, subject, body){
        var transporter = nodemailer.createTransport({
            service: `${email_host}`,
            auth: {
                user: `${email_user}`,
                pass: `${email_pass}`
            }
        });
        var mailOptions = {
            from: `${email_user}`,
            to: `${recipient}`,
            subject: `${subject}`,
            body: `${body}`
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}