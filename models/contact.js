
'use strict';

var db               = require('mongoose'),
    mail             = require('nodemailer'),
    smtp_transport   = require('nodemailer-smtp-transport');

var transporter = mail.createTransport(smtp_transport({
  host: 'localhost',
  port: 25,
  auth: {
    user: 'snob',
    pass: 'slipper411#corps'
  },
  tls: { rejectUnauthorized: false }
}));

var Schema = new db.Schema({
  name:           { type: String },
  email:          { type: String },
  phone:          { type: String },
  comments:       { type: String }
});

Schema.post('save', function(doc) {
  transporter.sendMail({
    from: 'lapr@pixelsnob.com',
    to: 'snob@pixelsnob.com',
    subject: 'New Contact',
    text: 'x'
  }, function() {
    console.log(arguments);
  });
});

module.exports = function(mai) {
  Schema.plugin(mai.plugin, {
    model: 'Contact',
    startAt: 1
  });
  return db.model('Contact', Schema);
};

