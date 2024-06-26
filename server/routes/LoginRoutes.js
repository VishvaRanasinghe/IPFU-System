const express = require("express");
const LoginRouter = express.Router();
const User = require("../models/User");

// POST route for user login
LoginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Redirect based on user role
    if (user.userRole === "donor") {
      return res.json("donor"); // Redirect to donor dashboard
    } else if (user.userRole === "receiver") {
      return res.json("receiver"); // Redirect to receiver dashboard
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = LoginRouter;
