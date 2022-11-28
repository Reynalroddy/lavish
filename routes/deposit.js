const express = require("express");

const router = express.Router();

const {
    create,
    getDeps
  } = require("../controllers/deposit");

  const authUser = require("../middleware/authentication");
  router.post("/create", authUser, create);
router.get("/summary", authUser, getDeps);

module.exports = router;