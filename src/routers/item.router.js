const express = require("express");
const router = express.Router();
const ItemCtrl = require("../controllers/item.controller");
const Validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { authRoles } = require("../middlewares/role.middleware");

router.use(auth);

router.post("/createItem", authRoles("admin", "staff", "user"), upload.single("image"), Validate({ body: ["name", "description", "price", "category"] }), ItemCtrl.createItem);
router.get("/getItems", ItemCtrl.getItems);
router.get("/getItemById/:id", ItemCtrl.getItemById);
router.put("/updateItem/:id", authRoles("admin", "staff"), Validate({ body: ["name", "description", "price", "category"] }), ItemCtrl.updateItem);
router.delete("/deleteItem/:id", authRoles("admin", "staff"), ItemCtrl.deleteItem);

module.exports = router;