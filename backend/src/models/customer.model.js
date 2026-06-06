const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },

  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  email: { type: String },
  address: {
    type: String,
  },
  idProofNumber: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["active", "inActive"],
    default: "inActive",
  },
});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
