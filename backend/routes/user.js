const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get(
  "/listUsers/:name?",
  Auth,
  ValidateUser,
  Admin,
  UserController.listUser
);
router.get(
  "/listUsers/:name?",
  Auth,
  ValidateUser,
  Admin,
  UserController.listUserAll
);
router.put("/updateUser", Auth, ValidateUser, Admin, UserController.updateUser);
router.put("/deleteUser", Auth, ValidateUser, Admin, UserController.deleteUser);
router.post(
  "/registerAdmin",
  UserController.registerAdmin
);
router.get("/getRole/:email", Auth, ValidateUser, UserController.getRole);

module.exports = router;
