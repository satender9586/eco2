const express = require("express");
const { userRegister, userLogin } = require("../controller/authController")

const router = express.Router();

// Routing

// REGISTER || METHOD POST
router.post("/register", userRegister);

// LOGIN || METHOD POST
router.post("/login", userLogin)
module.exports = router
