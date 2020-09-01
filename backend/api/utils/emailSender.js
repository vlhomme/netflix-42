
exports.sendEmail = (from, to, subject, txt) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    var mailOptions = {
        from: process.env.USER,
        to: to,
        subject: subject,
        text: txt
    };
    console.log("Sending email this may take a while ....");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error send email : ");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
