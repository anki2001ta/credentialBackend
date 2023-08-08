const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  res.send(result);
});

const getIndividuals = catchAsync(async (req, res) => {
  const result = await userService.queryIndiviuals();
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getOrgUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const getIndividualUser = catchAsync(async (req, res) => {
  const user = await userService.getIndividualUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteOrgUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteIndividualUser = catchAsync(async (req, res) => {
  await userService.deleteIndividualUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  getIndividuals,
  deleteUser,
  getIndividualUser,
  deleteIndividualUser,
};
