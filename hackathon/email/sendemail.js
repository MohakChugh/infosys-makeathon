const env = require('dotenv');
const nodemailer = require('nodemailer');
const log = console.log;
const template = require('./emailtemplate');
const config = require('./config');

const sendOurMail = (sendto, subject, message) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });

    let mailOptions = {
        from: config.email,
        to: `${sendto}`,
        subject: `${subject}`,
        text: `${message}`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            log('Error occurs' + err);
        } else {
            log('SUCCESS');
        }
    });
}

exports.sendOurMail = sendOurMail;