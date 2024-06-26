const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/:id", ProductController.getProductById);
productRouter.post(
  "/add",
  upload.single("image"),
  ProductController.addProduct
);
productRouter.put("/update/:id", ProductController.updateProduct);
productRouter.delete("/delete/:id", ProductController.deleteProduct);

module.exports = productRouter;
