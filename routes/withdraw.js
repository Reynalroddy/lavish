const express = require("express");

const router = express.Router();

const {
    getWiths, create
  } = require("../controllers/withdraw");

  const authUser = require("../middleware/authentication");
  router.post("/create", authUser, create);
router.get("/summary", authUser,getWiths);

module.exports = router;