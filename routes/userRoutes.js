const express = require("express");
const router = express.Router();
const UserAuth = require("../middleware/UserAuth");

const userController = require("../controllers/userController");

router.post("/login", userController.login);

router.post("/register", userController.register);
//edit user
router.post("/edit", UserAuth, userController.editUser);
//delete
router.delete("/delete", UserAuth, userController.deleteUser);
module.exports = router; // export the router object
