const express = require("express");
const router = express.Router();
const lookupController = require("../controllers/lookupController");

router.post("/", lookupController.lookup);

module.exports = router;

