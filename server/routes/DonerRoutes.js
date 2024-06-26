const express = require("express");
const DonerRouter = express.Router();
const DonerController = require("../controllers/DonorController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_doner_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

DonerRouter.get("/", DonerController.getAllDonors);
DonerRouter.get("/:id", DonerController.getDonorById);
DonerRouter.post(
  "/add",
  upload.single("ProfileImage"),
  DonerController.addDonor
);
DonerRouter.put("/update/:id", DonerController.updateDonor);
DonerRouter.delete("/delete/:id", DonerController.deleteDonor);

module.exports = DonerRouter;
