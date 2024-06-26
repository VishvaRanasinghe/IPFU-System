const express = require("express");
const SusProductRouter = express.Router();
const SusProductController = require("../controllers/SusProductController");

SusProductRouter.get("/", SusProductController.getAllSuspendedProducts);
SusProductRouter.get("/:id", SusProductController.getSuspendedProductById);
SusProductRouter.post("/add", SusProductController.addSuspendedProduct);
SusProductRouter.delete(
  "/delete/:id",
  SusProductController.deleteSuspendedProduct
);

module.exports = SusProductRouter;
