const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI || `mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
