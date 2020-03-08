const mailer = require('nodemailer');


/**
 * Emails the roll set's url to the address provided
 */
exports.emailRollSetURL = async function(rollSet, address) {
    let transporter = mailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: address,
            subject: 'Test',
            html: rollSet.urlHash
        });
    } catch (err) {
        console.log('email was not sent: ' + err);
    }
}