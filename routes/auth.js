const express = require("express");

const router = express.Router();

const { register, login, updateUser } = require("../controllers/auth");
//auth middleware
const authUser = require("../middleware/authentication");
//register
router.post("/register", register);

//login
router.post("/login", login);

router.patch("/updateUser", authUser, updateUser);

module.exports = router;
