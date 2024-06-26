const User = require("../models/User");
const fs = require("fs");

// Function to add a new Donor
exports.addDonor = async (req, res) => {
  try {
    // Check if req.body exists and contains the expected properties
    if (
      !req.body ||
      !req.body.email ||
      !req.body.password ||
      !req.body.donorInfo.firstName
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const { email, password, donorInfo } = req.body;
    proPicUrl = req.file.path;

    const newUser = new User({
      email,
      password,
      userRole: "donor",
      donorInfo: {
        firstName: donorInfo.firstName,
        lastName: donorInfo.lastName,
        phoneNumber: donorInfo.phoneNumber,
      },
      ProfileImage: proPicUrl,
    });

    await newUser.save();
    return res.status(201).json({ message: "Donor added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get all Donors
exports.getAllDonors = async (req, res, next) => {
  try {
    const donors = await User.find({ userRole: "donor" });
    if (donors.length === 0) {
      return res.status(404).json({ message: "No Donors available." });
    }
    return res.status(200).json({ donors });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single donor by ID
exports.getDonorById = async (req, res, next) => {
  try {
    // Extract the donor ID from the URL parameters
    const donorId = req.params.id;

    // Find the Donor by ID
    const donor = await User.findOne({ _id: donorId, userRole: "donor" });

    // Check if the Donor exists
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // If the Donor exists, return it
    return res.status(200).json({ donor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update a Donor
exports.updateDonor = async (req, res, next) => {
  try {
    const donorId = req.params.id;
    const { firstName, lastName, phoneNumber } = req.body;

    const updatedDonorInfo = {
      firstName,
      lastName,
      phoneNumber,
    };

    const updatedDonorDocument = await User.findOneAndUpdate(
      { _id: donorId, userRole: "donor" },
      { donerInfo: updatedDonorInfo },
      { new: true }
    );

    if (!updatedDonorDocument) {
      return res.status(404).json({ message: "Donor not found" });
    }

    return res.status(200).json({
      message: "Donor updated successfully",
      donor: updatedDonorDocument,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a Donor
exports.deleteDonor = async (req, res, next) => {
  try {
    // Extract the Donor ID from the URL parameters
    const donorId = req.params.id;

    // Find the Donor and delete it
    const deletedDonor = await User.findOneAndDelete({
      _id: donorId,
      userRole: "donor",
    });

    // Check if the Donor exists and was successfully deleted
    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // You may need to handle the deletion of associated resources here

    return res.status(200).json({
      message: "Donor deleted successfully",
      donor: deletedDonor,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
