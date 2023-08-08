const mongoose = require("mongoose");
const issuedCredentialsSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  
  certificates: String,
});

const issuedCredentialsModel = mongoose.model(
  "issuedCredentialsCollection",
  issuedCredentialsSchema
);

module.exports = issuedCredentialsModel;
// credentials service