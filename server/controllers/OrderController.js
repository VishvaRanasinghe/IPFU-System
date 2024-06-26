const Order = require("../models/Order");

// Function to get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    let orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders available." });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a single order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new order
exports.addOrder = async (req, res, next) => {
  try {
    // Check if req.body exists and contains the expected properties
    if (
      !req.body ||
      !req.body.totalPrice ||
      !req.body.shopsContribution ||
      !req.body.cardDetails
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const { totalPrice, shopsContribution, cardDetails, suspendedProductIds } =
      req.body;

    const newOrder = new Order({
      totalPrice,
      shopsContribution,
      cardDetails,
      suspendedProductIds,
    });
    await newOrder.save();

    return res.status(201).json({ message: "Order added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete an order
exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
