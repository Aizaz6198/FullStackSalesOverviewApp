const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("RQ_Analytics");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connectDB;
