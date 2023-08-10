const mongoose = require("mongoose");
// post request to get the data of the user from the org for certificate along with meta data

const organizationSignupModel = require("../models/organizationSignup.model");
const allGroupsModel = require("../models/allGroups.model");
const metaInfoModel = require("../models/metaData.model");
const issuedCredentialsModel = require("../models/issuedCredentials.model");
const individualAddedCredentialsModel = require("../models/individualAddedCredentials.model");
const { sendCertificateGenerateEmail } = require("../services/email.service");

//!Post API route for creating a course, inside allcoursescollection and adds courseId inside courses node inside the organizationSignupcollection
//This will work as create group api by org
const createGroup = async (req, res) => {
  console.log(" from group controller", req.body.userID);
  try {
    const user = await organizationSignupModel.findById(req.body.userID);
    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await allGroupsModel.create({
      ...req.body,
      orgId: req.body.userID,
    });

    const updateCourses = user.groups;
    updateCourses.push(req.body.groupId);
    const id = req.body.userID;
    await organizationSignupModel.findByIdAndUpdate(id, {
      groups: updateCourses,
    });

    return res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create Group" });
  }
};

const getAllGroupsCollection = async (req, res) => {
  const orgId = req.query.orgId; 
  console.log(orgId);

  try {
    const groups = await allGroupsModel.find({ orgId });
    console.log(groups, "groups");
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};



const delGroupCollectionData = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);

    let group = await allGroupsModel.findOneAndDelete({ groupId: id });

    let orgData = await organizationSignupModel.findOne({
      _id: mongoose.Types.ObjectId(group.orgId),
    });
    console.log("Organization Data ", orgData);

    let groups = orgData.groups.filter((e) => e != id);
    console.log("After Removing Group", groups);

    await organizationSignupModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(group.orgId),
      { $set: { groups } }
    );

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to Delete the group" });
  }
};

const updateGroupCollectionData = async (req, res) => {
  try {
    const id = req.params.id;

    const group = await allGroupsModel.findOneAndUpdate(
      { groupId: id },
      { ...req.body }
    );

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the group." });
  }
};

const addCoordinates = async (req, res) => {
  const groupId = req.params.id;
  try {
    const group = await allGroupsModel.find({ groupId: groupId });
    const updateCoordinates = group[0].coordinates;
    // updateCoordinates.push(req.body);
    updateCoordinates[0] = req.body;
    await allGroupsModel.findOneAndUpdate(
      { groupId: groupId },
      { $set: { coordinates: updateCoordinates } },
      { new: true }
    );

    return res.status(200).json({ group });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      error: "Failed to add coordinates controller orgainzation.js",
    });
  }
};

// Form and General API
const retrieveMetaData = async (req, res) => {
  const userData = req.body;
  const missingFields = [];
  const customArray = [];
  // Get the fields from the certificateModel schema
  const schemaFields = Object.keys(metaInfoModel.schema.obj);

  // Check for missing fields and meta fields
  for (const field of schemaFields) {
    if (!(field in userData)) {
      missingFields.push(field);
    }
  }
  // Here storing the meta or custom fields in customArray
  for (const field in userData) {
    if (!(field in metaInfoModel.schema.obj)) {
      customArray.push({ [field]: userData[field] });
    }
  }
  //Checking if all the required fields are present

  if (missingFields.length > 0) {
    res.status(400).send({ error: "Missing fields", missingFields });
  } else {
    const response = { ...userData }; //Sending custom field along with other fields in response

    if (customArray.length > 0) {
      response.customArray = customArray;
    }

    metaInfoModel.create(response);

    res.send(response);
  }
};
//Based on email and groupID
const getTemplateData = async (req, res) => {
  let { email } = req.query;
  let groupId = req.params.groupId;

  let group = await allGroupsModel.find({ groupId });
  let metaData = await metaInfoModel.find({ groupId });

  res.send({ group, metaData });
};

//org will store the generated certificates inside issuedCredentials and send the mail regarding certificates has generated
// In the certificate generated email we have change the link with application deployed url
const postIssuedCredentials = async (req, res) => {
  try {
    const createIndividual = await issuedCredentialsModel.create({
      ...req.body,
    });
    console.log(req.body.userEmail,"req.body.userEmail")
    sendCertificateGenerateEmail(req.body.userEmail);
    res.status(200).send(createIndividual);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create certificate by Individual11" });
  }
};







// get the issued certificates of Individual based on userEmail
const getIssuedCredentials = async (req, res) => {
  const userEmail = req.params.userEmail;
  console.log(userEmail);
  try {
    const getIssuedCredentials = await issuedCredentialsModel.find({
      userEmail: userEmail,
    });
    res.json(getIssuedCredentials);
  } catch (err) {
    console.log({ err: "No such credentials found with given email" });
  }
};

//! post all data of user of "add Credentials" page
const individualAddCredential = async (req, res) => {
  try {
   const individualAddedCredentials=await individualAddedCredentialsModel.create({
      ...req.body,
    });
     res.send(individualAddedCredentials,{ message: "Certificate Added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to Add Certificate" });
  }
};

// get all data of user of "add Credentials" page
const getIndividualAddedCredentials = async (req, res) => {
  const userId=req.params.userId
  try {
    let data = await individualAddedCredentialsModel.find({userId});
    console.log(data)
    res.status(200).send({data});
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to get individual certificates" });
  }
};

module.exports = {
  createGroup,
  getAllGroupsCollection,
  addCoordinates,
  delGroupCollectionData,
  updateGroupCollectionData,
  retrieveMetaData,
  getTemplateData,
  postIssuedCredentials,
  individualAddCredential,
  getIndividualAddedCredentials,
  getIssuedCredentials,
};
