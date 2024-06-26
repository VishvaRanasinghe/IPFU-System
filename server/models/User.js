const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  ProfileImage: {
    type: String,
    default: "1712922147821_bendy-family-photo.png",
  },

  receiverInfo: {
    type: {
      firstName: String,
      lastName: String,
      NIC: String,
      phoneNo: String,
      address: String,
      city: String,
      province: String,
      zipCode: String,
    },
    default: null,
  },
  donorInfo: {
    type: {
      firstName: String,
      lastName: String,
      phoneNumber: String,
    },
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
