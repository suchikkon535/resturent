const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");

// router.use(auth);

router.post("/addCategory", categoryCtrl.addCategory);
router.get("/categorys", categoryCtrl.getCategorys);

module.exports = router;