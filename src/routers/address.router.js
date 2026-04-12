const express = require("express");
const router = express.Router();
const addressCtrl = require("../controllers/address.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.use(auth);

router.post("/addAddress", validate({ body: ["fullName", "phone", "addressLine", "city", "state"] }), addressCtrl.createAdderss);
router.get("/allAddress", addressCtrl.userAllAddress);

module.exports = router;