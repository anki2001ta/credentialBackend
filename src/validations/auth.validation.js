const Joi = require('joi');
const { password } = require('./custom.validation');

const orgSignup = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    orgName: Joi.string().required(),
    organizationUrl: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    jobTitle: Joi.string().required(),
    contact: Joi.number().required(),
    courses: Joi.array(),
  }),
};

const individualSignup = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contact: Joi.number().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
    body: Joi.object().keys({
      password: Joi.string().required().custom(password),
      token: Joi.string().required(),
    }),
  };

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  orgSignup,
  individualSignup,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
