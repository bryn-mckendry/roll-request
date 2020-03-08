const nodemailer = require('nodemailer');


/**
 * Verifies that the STMP server is ready to receive messages
 * for the mailing service to work correctly.
 */
exports.verifySMTPConnection = async (req, res, next) => {
    let transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    await transport.verify((err, succ) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            next();
        }
    })
}