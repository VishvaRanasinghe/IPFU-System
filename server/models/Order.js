const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  shopsContribution: {
    type: Number,
    required: true,
  },
  cardDetails: {
    fullName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
  },
  suspendedProductIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuspendedProduct",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
