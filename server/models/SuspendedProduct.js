const mongoose = require("mongoose");

const SuspendedProductSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doner",
    required: true,
  },
  suspendedProductQuantity: {
    type: Number,
    required: true,
  },
});

const SuspendedProduct = mongoose.model(
  "SuspendedProduct",
  SuspendedProductSchema
);

module.exports = SuspendedProduct;
