const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.create);

router.post("/sendToAll", userController.sendEmailToUsers);

module.exports = router;
