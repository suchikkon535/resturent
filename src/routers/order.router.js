const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.use(auth);

router.post("/placeOrder", validate({ body: ["addressId", "paymentMethod"] }), orderCtrl.createOrder);
// router.get("/myOrders", orderCtrl.userOrders);
// router.get("/orderDetails/:id", orderCtrl.orderDetails);

module.exports = router;