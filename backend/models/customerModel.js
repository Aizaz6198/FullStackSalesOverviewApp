const connectDB = require("../config/db");

async function getCustomerCollection() {
  const db = await connectDB();
  return db.collection("shopifyCustomers");
}

module.exports = { getCustomerCollection };
