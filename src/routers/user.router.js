const express = require("express");
const router = express.Router();
const UserCrtl = require("../controllers/user.controller");
const Validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");


router.post("/register", Validate({body: ["fullname", "email", "password"]}), UserCrtl.createUser);
router.post("/login", Validate({body: ["email", "password"]}), UserCrtl.loginUser);
router.get("/profile", auth, UserCrtl.getProfile);
router.put("/updateprofile", auth, UserCrtl.updateProfile);

module.exports = router;