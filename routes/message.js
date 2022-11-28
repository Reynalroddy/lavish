const express = require("express");

const router = express.Router();

const {
    create,
   
  } = require("../controllers/msg");

//   const authUser = require("../middleware/authentication");
  router.post("/create", create);

module.exports = router;