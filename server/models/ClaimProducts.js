const mongoose = require("mongoose");

const ClaimProductSchema = new mongoose.Schema({
  SusproductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SuspendedProduct",
    required: true,
  },
  claimant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver", // Assuming you have a User model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

const ClaimProducts = mongoose.model("ClaimProduct", ClaimProductSchema);
module.exports = ClaimProducts;
