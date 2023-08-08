const mongoose = require("mongoose");
const allGroupsSchema = mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.Mixed,
  },
  groupName: {
    type: String,
  },
  groupIdentifier: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  groupId: {
    type: String,
  },
  coordinates: [Object],
});

const allGroupsModel = mongoose.model("allGroupsCollections", allGroupsSchema);

module.exports = allGroupsModel;
// credential service