const express = require("express");
const {
  getNewCustomers,
  getRepeatCustomers,
  getCustomerDistribution,
  getCustomerLifetimeValue,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/new-customers", getNewCustomers);
router.get("/repeat-customers", getRepeatCustomers);
router.get("/customer-distribution", getCustomerDistribution);
router.get("/customer-lifetime-value", getCustomerLifetimeValue);

module.exports = router;
