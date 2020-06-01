const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.get("",UserController.getUsers);
router.post("/login", UserController.userLogin);
router.get("/:cx",UserController.getUser);
router.put("/:id" , UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
