const Manager = require("../models/Manager");

// Function to get all managers
exports.getAllManagers = async (req, res, next) => {
  try {
    let managers = await Manager.find();
    if (managers.length === 0) {
      return res.status(404).json({ message: "No managers found" });
    }
    return res.status(200).json({ managers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single manager by ID
exports.getManagerById = async (req, res, next) => {
  try {
    const managerId = req.params.id;
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ manager });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new manager
exports.addManager = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phone } = req.body;
    const newManager = new Manager({
      email,
      firstName,
      lastName,
      phone,
    });
    await newManager.save();
    return res.status(201).json({ message: "Manager added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update a manager
exports.updateManager = async (req, res, next) => {
  try {
    const managerId = req.params.id;
    const { email, firstName, lastName, phone } = req.body;
    const updatedManager = {
      email,
      firstName,
      lastName,
      phone,
    };
    const updatedManagerDocument = await Manager.findByIdAndUpdate(
      managerId,
      updatedManager,
      { new: true }
    );
    if (!updatedManagerDocument) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ message: "Manager updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a manager
exports.deleteManager = async (req, res, next) => {
  try {
    const managerId = req.params.id;
    const deletedManager = await Manager.findByIdAndDelete(managerId);
    if (!deletedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ message: "Manager deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
