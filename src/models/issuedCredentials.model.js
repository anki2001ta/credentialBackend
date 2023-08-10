const mongoose = require("mongoose");
const issuedCredentialsSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  recieverName: {
    type: String,
  },
  groupId: {
    type: String,
  },
  trainingStartDate: {
    type: String,
  },
  trainingEndDate: {
    type: String,
  },
  orgID: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  groupName: {
    type: String,
  },
  coordinates: {
    type: [mongoose.Schema.Types.Mixed],
  },
 
});

const issuedCredentialsModel = mongoose.model(
  "issuedCredentialsCollection",
  issuedCredentialsSchema
);

module.exports = issuedCredentialsModel;
// credentials service