const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.use(auth);

router.post("/addToCart", validate({ body: ["itemId", "quantity"] }), cartCtrl.addToCart);
router.get("/getCart", cartCtrl.userCartItems);
// router.put("/updateCartItem/:id", validate({ body: ["quantity"] }), cartCtrl.updateCartItem);
// router.delete("/removeFromCart/:id", cartCtrl.removeFromCart);

module.exports = router;