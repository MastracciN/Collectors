// const express = require("express");
// const router = express.Router();
// const lookupController = require("../controllers/lookupController");

// router.post("/", lookupController.lookup);

// export default router;

import express from "express";
import { lookupUPC } from "../controllers/lookupController.js";

const router = express.Router();

// POST /api/lookup
router.post("/", lookupUPC);

export default router;

