// routes.js

const express = require("express");
const multerController = require("../controllers/multer.controller");

const multerRoute = express.Router();

multerRoute.post("/upload", multerController.uploadProfileImage);

module.exports = multerRoute;
// part of multer we can use it in credentials service
