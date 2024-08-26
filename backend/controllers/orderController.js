const { getOrderCollection } = require("../models/orderModel");

async function getAllOrders(req, res) {
  try {
    const orderCollection = await getOrderCollection();
    const orders = await orderCollection.find().toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// Add the other order-related logic here

module.exports = { getAllOrders };
