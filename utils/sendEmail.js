const nodemailer = require("nodemailer");

let resetPasswordURL;
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function send(options) {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: options.sender, // sender address
            to: options.receiver, // list of receivers
            subject: "Reset Password", // Subject line
            html: options.html, // html body
        });

        console.log("Message sent: %s", info.messageId);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = send

