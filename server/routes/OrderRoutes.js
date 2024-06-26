const express = require("express");
const OrderRouter = express.Router();
const OrderController = require("../controllers/OrderController");

OrderRouter.get("/", OrderController.getAllOrders);
OrderRouter.get("/:id", OrderController.getOrderById);
OrderRouter.post("/add", OrderController.addOrder);
OrderRouter.delete("/delete/:id", OrderController.deleteOrder);

module.exports = OrderRouter;
