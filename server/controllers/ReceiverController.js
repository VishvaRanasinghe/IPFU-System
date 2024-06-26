const User = require("../models/User");
const fs = require("fs");

// Function to add a new Receiver
exports.addReceiver = async (req, res) => {
  try {
    // Check if req.body exists and contains the expected properties
    if (!req.body || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const { email, password, receiverInfo } = req.body;
    let proPicUrl = "";

    // Check if a profile picture is uploaded
    if (req.file && req.file.path) {
      proPicUrl = req.file.path;
    }

    const newUser = new User({
      email,
      password,
      userRole: "receiver",
      receiverInfo: {
        firstName: receiverInfo.firstName,
        lastName: receiverInfo.lastName,
        NIC: receiverInfo.NIC,
        phoneNo: receiverInfo.phoneNo,
        address: receiverInfo.address,
        city: receiverInfo.city,
        province: receiverInfo.province,
        zipCode: receiverInfo.zipCode,
      },
      ProfileImage: proPicUrl || "default_profile_image.png",
    });

    await newUser.save();

    res.status(201).json({ message: "Receiver added successfully" });
  } catch (error) {
    console.error("Error adding receiver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all ReceiverDetails
exports.getAllReceiver = async (req, res, next) => {
  try {
    const receivers = await User.find({ userRole: "receiver" });
    if (receivers.length === 0) {
      return res.status(404).json({ message: "No Receivers available." });
    }
    return res.status(200).json({ receivers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single receiver by ID
exports.getReceiverById = async (req, res, next) => {
  try {
    // Extract the receiver ID from the URL parameters
    const receiverId = req.params.id;

    // Find the Receiver by ID
    const receiver = await User.findOne({
      _id: receiverId,
      userRole: "receiver",
    });

    // Check if the Receiver exists
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // If the Receiver exists, return it
    return res.status(200).json({ receiver });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update a Receiver
exports.updateReceiver = async (req, res, next) => {
  try {
    const receiverId = req.params.id;
    const { fname, lname, email, phone } = req.body;

    const updatedReceiverInfo = {
      firstName: fname,
      lastName: lname,
      phoneNo: phone,
      // Add other receiver details as needed
    };

    const updatedReceiverDocument = await User.findOneAndUpdate(
      { _id: receiverId, userRole: "receiver" },
      { receiverInfo: updatedReceiverInfo },
      { new: true }
    );

    if (!updatedReceiverDocument) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    return res.status(200).json({
      message: "Receiver updated successfully",
      receiver: updatedReceiverDocument,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a Receiver
exports.deleteReceiver = async (req, res, next) => {
  try {
    // Extract the Receiver ID from the URL parameters
    const receiverId = req.params.id;

    // Find the Receiver and delete it
    const deletedReceiver = await User.findOneAndDelete({
      _id: receiverId,
      userRole: "receiver",
    });

    // Check if the Receiver exists and was successfully deleted
    if (!deletedReceiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // You may need to handle the deletion of associated resources here

    return res.status(200).json({
      message: "Receiver deleted successfully",
      receiver: deletedReceiver,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
