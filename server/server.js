const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./routes/ProductRoutes");
const shopProfileRouter = require("./routes/ShopProfileRoutes");
const claimsRouter = require("./routes/ClaimsRoutes");
const ReceiverRouter = require("./routes/ReceiverRoutes");
const DonorRouter = require("./routes/DonerRoutes");
const LoginRouter = require("./routes/LoginRoutes");
const susproductRouter = require("./routes/SusProductRoutes");
const orderRouter = require("./routes/OrderRoutes");
const eventRouter = require("./routes/eventsRoutes");
const paymentRouter = require("./routes/paymentsRoutes");
const ManagerRouter = require("./routes/ManagerRoutes");
const decisionRouter = require("./controllers/decisionController");

const cors = require("cors");
require("dotenv").config();
PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/products", productRouter);
app.use("/susproducts", susproductRouter);

app.use("/orders", orderRouter);
app.use("/manager", ManagerRouter);

app.use("/shops", shopProfileRouter);
app.use("/receiver", ReceiverRouter);
app.use("/donor", DonorRouter);

app.use("/login", LoginRouter);
app.use("/claims", claimsRouter);
// Routes of donation Programme
app.use("/event", eventRouter);
app.use("/payment", paymentRouter);

//decision Analytics
app.use("/decision", decisionRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
