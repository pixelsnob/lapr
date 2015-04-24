/**
 * Mail transporter setup
 * 
 */

'use strict';

var mail             = require('nodemailer'),
    smtp_transport   = require('nodemailer-smtp-transport'),
    config           = require('../config');

var transporter = mail.createTransport(smtp_transport({
  host: 'localhost',
  port: 25,
  auth: {
    user: 'snob',
    pass: config.smtp_password
  },
  tls: { rejectUnauthorized: false }
}));

module.exports = {
  transporter: transporter
};

