const ClaimProducts = require("../models/ClaimProducts");

exports.getAllClaimedProducts = async (req, res, next) => {
  try {
    let claimedProducts = await ClaimProducts.find()
      .populate({
        path: "SusproductId", // Field referencing SuspendedProduct
        model: "SuspendedProduct", // SuspendedProduct model
        populate: {
          path: "product", // Field referencing User in SuspendedProduct
          model: "Product", // User model
          select: "name", // Select the fields you need from the User model
        },
      })
      .populate({
        path: "claimant", // Field referencing User
        model: "Receiver", // Receiver model
        select: "email", // Select the fields you need from the Receiver model
      });

    if (claimedProducts.length === 0) {
      return res.status(404).json({ message: "No claimed products found." });
    }
    return res.status(200).json({ claimedProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single claimed product by ID
exports.getClaimedProductById = async (req, res, next) => {
  try {
    // Extract the claimed product ID from the URL parameters
    const claimedProductId = req.params.id;

    // Find the claimed product by ID
    const claimedProduct = await ClaimProducts.findById(claimedProductId);

    // Check if the claimed product exists
    if (!claimedProduct) {
      return res.status(404).json({ message: "Claimed product not found" });
    }

    // If the claimed product exists, return it
    return res.status(200).json({ claimedProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new claimed product
exports.addClaimedProduct = async (req, res, next) => {
  try {
    // Check if req.body exists and contains the expected properties
    if (
      !req.body ||
      !req.body.SusproductId ||
      !req.body.claimant ||
      !req.body.quantity
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const SusproductId = req.body.SusproductId;
    const claimant = req.body.claimant;
    const quantity = parseInt(req.body.quantity);

    const newClaimedProduct = new ClaimProducts({
      SusproductId: SusproductId,
      claimant: claimant,
      quantity: quantity,
    });
    await newClaimedProduct.save();

    return res
      .status(201)
      .json({ message: "Claimed product added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update a claimed product
exports.updateClaimedProduct = async (req, res, next) => {
  try {
    const claimedProductId = req.params.id;
    const { quantity, status } = req.body;

    const updatedClaimedProduct = {
      quantity,
      status,
    };

    const updatedClaimedProductDocument = await ClaimProducts.findByIdAndUpdate(
      claimedProductId,
      updatedClaimedProduct,
      { new: true }
    );

    if (!updatedClaimedProductDocument) {
      return res.status(404).json({ message: "Claimed product not found" });
    }

    return res.status(200).json({
      message: "Claimed product updated successfully",
      //claimedProduct: updatedClaimedProductDocument,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a claimed product
exports.deleteClaimedProduct = async (req, res, next) => {
  try {
    // Extract the claimed product ID from the URL parameters
    const claimedProductId = req.params.id;

    // Find the claimed product and delete it
    const deletedClaimedProduct = await ClaimProducts.findOneAndDelete({
      _id: claimedProductId,
    });

    // Check if the claimed product exists and was successfully deleted
    if (!deletedClaimedProduct) {
      return res.status(404).json({ message: "Claimed product not found" });
    }

    return res.status(200).json({
      message: "Claimed product deleted successfully",
      //claimedProduct: deletedClaimedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
