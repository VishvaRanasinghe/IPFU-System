const express = require("express");
const claimsRouter = express.Router();
const claimsController = require("../controllers/ClaimController");

//routes
claimsRouter.get("/", claimsController.getAllClaimedProducts);
claimsRouter.post("/add", claimsController.addClaimedProduct);
claimsRouter.put("/:id", claimsController.updateClaimedProduct);
claimsRouter.delete("/:id", claimsController.deleteClaimedProduct);
claimsRouter.get("/:id", claimsController.getClaimedProductById);

module.exports = claimsRouter;
