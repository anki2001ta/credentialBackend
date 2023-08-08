const mongoose = require("mongoose");
const certificateSchema = mongoose.Schema(
  {
    recieverName: {
      type: String,
      required: [true, "Please Enter Your Reciever's Name"],
    },
    groupId: {
      type: String,
      required: [true, "Please Enter groupId"],
    },
    groupName:{
      type: String,
      required: [true, "Please Enter groupName"],
    },
    issuedDate: {
      type: String,
      required: [true, "Please Enter your trainingStartDate"],
    },
    expiredDate: {
      type: String,
      required: [true, "Please Enter your trainingEndDate"],
    },
    userEmail: {
      type: String,
      required: [true, "Please Enter your email"],
    },
  },
  { strict: false }
);

const metaInfoModel = mongoose.model("metaDataCollection", certificateSchema);
module.exports = metaInfoModel;
// credentials service