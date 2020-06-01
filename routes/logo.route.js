const express = require("express");
const extractFile = require("../middleware/file");

const LogoController = require("../controllers/logo.controller");

const router = express.Router();

router.post("", extractFile, LogoController.createLogo);
router.get("",LogoController.getLogo);
// router.post("/login", UserController.userLogin);
// router.get("/:cx",UserController.getUser);
// router.put("/:id" , UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);

module.exports = router;
