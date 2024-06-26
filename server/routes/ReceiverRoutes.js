const express = require("express");
const ReceiverRouter = express.Router();
const ReceiverController = require("../controllers/ReceiverController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_receiver_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

ReceiverRouter.get("/", ReceiverController.getAllReceiver);
ReceiverRouter.get("/:id", ReceiverController.getReceiverById);
ReceiverRouter.post(
  "/add",
  upload.single("ProfileImage"),
  ReceiverController.addReceiver
);
ReceiverRouter.put("/update/:id", ReceiverController.updateReceiver);
ReceiverRouter.delete("/delete/:id", ReceiverController.deleteReceiver);

module.exports = ReceiverRouter;
