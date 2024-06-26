const express = require("express");
const ManagerRouter = express.Router();
const ManagerController = require("../controllers/ManagerController");

ManagerRouter.get("/", ManagerController.getAllManagers);
ManagerRouter.get("/:id", ManagerController.getManagerById);
ManagerRouter.post("/add", ManagerController.addManager);
ManagerRouter.put("/update/:id", ManagerController.updateManager);
ManagerRouter.delete("/delete/:id", ManagerController.deleteManager);

module.exports = ManagerRouter;
