const { getProductCollection } = require("../models/productModel");

async function getAllProducts(req, res) {
  try {
    const productCollection = await getProductCollection();
    const products = await productCollection.find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

module.exports = { getAllProducts };
