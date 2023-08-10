const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport({
  service: 'Gmail',
   auth: {
    user: 'ankitadeb1202@gmail.com',
    pass: 'aydxuicqdibuabfm',
  },
});

transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch((error) => console.log(logger.warn('Unable to connect to email server.')));

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `http://localhost:3000/setNewPassword?token=${token}`;//This url should be application's url after deployment 
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};


const sendCertificateGenerateEmail = async (to) => {
  const subject = 'Certificate Generated';
  const Url = `http://localhost:3000/`;
  const text = `Your Certificate has been created 
  and click here to view the certificate ${Url}`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendCertificateGenerateEmail
};
