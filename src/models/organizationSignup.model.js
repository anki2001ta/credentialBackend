const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON } = require("./plugins");

const organizationSignupSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    organizationUrl: {
      type: String,
      required: [true, "Please Enter your organizationUrl"],
    },
    firstName: {
      type: String,
      required: [true, "Please Enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter your last name"],
    },
    jobTitle: {
      type: String,
      required: [true, "Please Enter your job Title"],
    },
    contact: {
      type: Number,
      required: [true, "Please Enter your contact"],
    },
    groups: {
      type: Array,
    },

    role: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
organizationSignupSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
organizationSignupSchema.statics.isEmailTaken = async function (
  email,
  excludeUserId
) {
  const orguser = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!orguser;
};

/**
 * Check if password matches the ORGuser's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
organizationSignupSchema.methods.isPasswordMatch = async function (password) {
  const orguser = this;
  return bcrypt.compare(password, orguser.password);
};

organizationSignupSchema.pre("save", async function (next) {
  const orguser = this;
  if (orguser.isModified("password")) {
    orguser.password = await bcrypt.hash(orguser.password, 8);
  }
  next();
});

const organizationSignupModel = mongoose.model(
  "organizationsignupcollections",
  organizationSignupSchema
);

module.exports = organizationSignupModel;
// user service