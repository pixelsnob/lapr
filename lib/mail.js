/**
 * Mail transporter setup
 * 
 */

'use strict';

var mail             = require('nodemailer'),
    smtp_transport   = require('nodemailer-smtp-transport');

var transporter = mail.createTransport(smtp_transport({
  host: 'localhost',
  port: 25,
  auth: {
    user: 'snob',
    pass: 'slipper411#corps' // <<<<<<<<<<<<<<<
  },
  tls: { rejectUnauthorized: false }
}));

module.exports = {
  transporter: transporter
};

