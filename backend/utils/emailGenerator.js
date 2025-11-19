var express = require('express'); // call express
var app = express(); //  initialize express
var path = require('path');
// var mailer = require('express-mailer');
var nodemailer = require('nodemailer');
const ejs = require("ejs");
app.engine('ejs', ejs.__express); // intializing ejs to send email template 
app.set('view engine', 'ejs');

const env = require('../environment');
const emailTemplates = require("./emailTemplate");
var mode = env.mode
var transporter = nodemailer.createTransport(env.email);






module.exports = {
    /**
     * 
     * @param {String} to is receivers email
     * @param {Object} body accepts {name: String, otp: Number}
     * @returns 
     */
    sendOtpEmail: async (to, body) => {


        console.log("evn----------------------->>>>>>>>>>>>" , env)

        console.log("to" , to)

        console.log("body" , body)


        let subject = `One Time Password`
        const template = emailTemplates['OtpEmail'];
        if (!template) {
            throw new Error("Template not found");
        }

        var mailOptions = {
            from: env.email.from, // sender address (who sends)
            to: to,
            subject: subject,
            html: template.body(body),
        };

        if(mode === 'development'){
            mailOptions.subject = 'DEV - '.concat(mailOptions.subject);
        }

        // Send mail
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: ", info.messageId);
            return true;
        } catch (error) {
            console.error("Error sending email: ", error);
            return ;
        }
    },
}   