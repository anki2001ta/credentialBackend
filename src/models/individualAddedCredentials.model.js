const mongoose = require("mongoose");
const individualAddedCredentialsSchema = new mongoose.Schema({
  certificateTitle: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  certificateId: {
    type: String,
  },
  issuedDate: {
    type: String,
  },
  expiredDate: {
    type: String,
  },
  certificateDescription: {
    type: String,
  },
  certificateUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const individualAddedCredentialsModel = mongoose.model(
  "individualAddedCredentialsCollection",
  individualAddedCredentialsSchema
);

module.exports = individualAddedCredentialsModel;
// credential service
