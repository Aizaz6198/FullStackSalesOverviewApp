const express = require("express");
const {
  getAllIntervalsSales,
  getSalesGrowth,
} = require("../controllers/salesController");

const router = express.Router();

router.get("/all-intervals", getAllIntervalsSales);
router.get("/growth", getSalesGrowth);

module.exports = router;
