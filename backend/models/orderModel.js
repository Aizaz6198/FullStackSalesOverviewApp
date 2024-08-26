const connectDB = require("../config/db");

async function getOrderCollection() {
  const db = await connectDB();
  return db.collection("shopifyOrders");
}

module.exports = { getOrderCollection };
