const config = require('../config/config');
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  host: 'send.one.com',
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  }
});

exports.sendEmail = (to, subject, html) => {
  let mailOptions = {
    from: config.emailUser,
    to: to,
    subject: subject,
    html: html
  };
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('sent')
        resolve(info)
      }
    });
  });
}






