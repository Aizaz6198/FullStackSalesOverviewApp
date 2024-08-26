const connectDB = require("../config/db");

async function getProductCollection() {
  const db = await connectDB();
  return db.collection("shopifyProducts");
}

module.exports = { getProductCollection };
