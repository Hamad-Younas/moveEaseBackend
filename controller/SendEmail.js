const { transporter } = require("../utils/nodemailer.js");


async function sendEmail(req, res) {
    const { name, email, desc } = req.query
    console.log(req.query)
    try {
        transporter.sendMail({
            from: `Move Ease Hub<${email}>`,
            to: process.env.EMAIL,
            subject: `Request from ${name}`,
            text: desc
        });
        console.log('Email sent successfully');
        res.status(200).json({ message: "Sent email" })
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

module.exports = {
    sendEmail
}