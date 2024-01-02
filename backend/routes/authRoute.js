const express = require("express");
const { userRegister, userLogin, testController } = require("../controller/authController")
const { requireSingIn, isAdmin } = require("../middleware/authMiddleware")

const router = express.Router();

// Routing

// REGISTER || METHOD POST
router.post("/register", userRegister);

// LOGIN || METHOD POST
router.post("/login", userLogin)

// text routes

router.get('/test', requireSingIn, isAdmin, testController)
module.exports = router
