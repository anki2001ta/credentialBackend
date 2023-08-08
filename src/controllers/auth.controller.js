const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const individualSignupModel = require("../models/individualSignup.model");
const organizationSignupModel = require("../models/organizationSignup.model");

const organizationRegistration = catchAsync(async (req, res) => {
  const orgUser = await userService.createOrgUser(req.body);
  const tokens = await tokenService.generateAuthTokens(orgUser);
  res.status(httpStatus.CREATED).send({ orgUser, tokens });
});

const individualRegisteration = catchAsync(async (req, res) => {
  const individualUser = await userService.createIndividualUser(req.body);
  const tokens = await tokenService.generateAuthTokens(individualUser);
  res.status(httpStatus.CREATED).send({ individualUser, tokens });
});

const orglogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.orgloginUserWithEmailAndPassword(
    email,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const individualLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.individualloginUserWithEmailAndPassword(
    email,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshOrgTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshOrgAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const refreshIndividualTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshIndividualAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const orgforgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateOrgResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const individualforgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken =
    await tokenService.generateIndividualResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetOrganizationPassword = catchAsync(async (req, res) => {
  await authService.resetOrgPassword(req.body.token, req.body.password);

  res.status(httpStatus.NO_CONTENT).send();
});

const resetIndividualPass = catchAsync(async (req, res) => {
  console.log(req.query.token);
  console.log(req.body.password);
  await authService.resetIndividualPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const orgverifyEmail = catchAsync(async (req, res) => {
  await authService.verifyOrgEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const individualverifyEmail = catchAsync(async (req, res) => {
  await authService.verifyIndividualEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

// Individual account update
const updateIndividualProfileSettings = catchAsync(async (req, res) => {
  try {
    let id = req.params.id;
    let user = await individualSignupModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Profile Updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update profile" });
  }
});

const updateOrganizationProfileSettings = catchAsync(async (req, res) => {
  try {
    let id = req.params.id;
    let doc = await organizationSignupModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Profile Updated successfully", doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = {
  orgverifyEmail,
  individualverifyEmail,
  organizationRegistration,
  individualRegisteration,
  orglogin,
  individualLogin,
  logout,
  refreshOrgTokens,
  refreshIndividualTokens,
  orgforgotPassword,
  resetOrganizationPassword,
  sendVerificationEmail,
  individualforgotPassword,
  resetIndividualPass,
  updateIndividualProfileSettings,
  updateOrganizationProfileSettings,
};
