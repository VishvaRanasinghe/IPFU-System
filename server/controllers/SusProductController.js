const SuspendedProduct = require("../models/SuspendedProduct");

exports.getAllSuspendedProducts = async (req, res, next) => {
  try {
    let suspendedProducts = await SuspendedProduct.find()
      .populate({
        path: "donor",
        model: "User", // User model
        select: "email donorInfo", // Select the fields you need from the User model
      })
      .populate({
        path: "product",
        model: "Product", // Product model
        select: "name image code", // Select the fields you need from the Product model
      });

    if (suspendedProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No suspended products available." });
    }

    return res.status(200).json({ suspendedProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single suspended product by ID
exports.getSuspendedProductById = async (req, res, next) => {
  try {
    const suspendedProductId = req.params.id;
    const suspendedProduct = await SuspendedProduct.findById(
      suspendedProductId
    );
    if (!suspendedProduct) {
      return res.status(404).json({ message: "Suspended product not found" });
    }
    return res.status(200).json({ suspendedProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new suspended product
exports.addSuspendedProduct = async (req, res, next) => {
  try {
    // Check if req.body exists and contains the expected properties
    if (
      !req.body ||
      !req.body.product ||
      !req.body.donor ||
      !req.body.suspendedProductQuantity
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const { product, donor, suspendedProductQuantity } = req.body;

    const newSuspendedProduct = new SuspendedProduct({
      product,
      donor,
      suspendedProductQuantity,
    });
    await newSuspendedProduct.save();

    return res
      .status(201)
      .json({ message: "Suspended product added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a suspended product
exports.deleteSuspendedProduct = async (req, res, next) => {
  try {
    const suspendedProductId = req.params.id;
    const deletedSuspendedProduct = await SuspendedProduct.findOneAndDelete({
      _id: suspendedProductId,
    });
    if (!deletedSuspendedProduct) {
      return res.status(404).json({ message: "Suspended product not found" });
    }
    return res
      .status(200)
      .json({ message: "Suspended product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
