const express = require('express');
const Email = require('../models/Email');
const validator = require('validator');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/subscribe', (req, res) => {
  if (!req.body.email || req.body.email == undefined) {
    res.status(400).json({
      status: 400,
      msg: 'Please send the email!',
    });
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400).json({
      status: 400,
      msg: `Please send a proper email address! ${req.body.email} is not a proper email address`,
    });
  }

  (async () => {
    try {
      const email = new Email({
        email: req.body.email,
      });
      // await email.save();
      console.log(email);
      const output = `
      <a href="https://crazy-peplum-colt.cyclic.app/newsletter/verify?email=${email.email}&key=${email.uniqueID}">Unsubscribe</a>
      `;

      let transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: "The Developer's Newsletter <shmugeesahmad@gmail.com>", // sender address
        to: email.email, // list of receivers
        subject: 'Testing', // Subject line
        // text: 'Hello world?', // plain text body
        html: output, // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({
          msg: 'Email saved! Please verify it in your mailbox now to start receiving newsletters',
          href: `/verify?email=${email.email}&key=${email.uniqueID}`,
        });
      });
    } catch (e) {
      console.log(e);
      if (e.code == 11000) {
        res
          .status(400)
          .json({ status: 400, msg: 'This email is already registered!' });
      }
    }
  })();
});

router.get('/verify', (req, res) => {
  res.send(req.query);
});

module.exports = router;
