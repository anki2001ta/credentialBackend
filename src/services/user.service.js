const httpStatus = require('http-status');
const { organizationSignupModel, individualSignupModel } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendEmail } = require('./email.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createOrgUser = async (userBody) => {
  if (await organizationSignupModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  let doc= await organizationSignupModel.create(userBody);
  sendEmail(userBody.email,"Account has been created successfully", `Dear user,
  Your Account has been created successfully`)
  return doc;
};

const createIndividualUser = async (userBody) => {
  if (await individualSignupModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  let doc= await individualSignupModel.create(userBody);
  sendEmail(userBody.email,"Account has been created successfully", `Dear user,
  Your Account has been created successfully`)
  return doc;
};

const queryUsers = async () => {
  const users = await organizationSignupModel.find({}); // Returns all Organizations
  return users;
};

const queryIndiviuals = async () => {
  const users = await individualSignupModel.find({}); // Returns all Individuals
  return users;
};


const getOrgUserById = async (id) => { // Return Organization By ID
  return organizationSignupModel.findById(id);
};

const getIndividualUserById = async (id) => {
  return individualSignupModel.findById(id);
};

const getOrgUserByEmail = async (email) => {
  return organizationSignupModel.findOne({ email });
};

// getting the individual user by the mail
const getIndividualUserByEmail = async (email) => {
  return individualSignupModel.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateOrgUserById = async (userId, updateBody) => {
  const user = await getOrgUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await organizationSignupModel.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateIndividualUserById = async (userId, updateBody) => {
  const user = await getIndividualUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await individualSignupModel.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteOrgUserById = async (userId) => {
  const user = await getOrgUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const deleteIndividualUserById = async (userId) => {
  const user = await getIndividualUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createOrgUser,
  updateIndividualUserById,
  createIndividualUser,
  getIndividualUserById,
  queryUsers,
  getOrgUserById,
  getOrgUserByEmail,
  getIndividualUserByEmail,
  updateOrgUserById,
  deleteOrgUserById,
  deleteIndividualUserById,
  queryIndiviuals
};
