const mongoose = require("mongoose");
const { countConnections, checkOverload } = require("../helpers/check.connect");

class Database {
  static instance;

  constructor() {
    this.connect();
  }

  async connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    const connectionString = "mongodb://localhost:27017/shopDEV";
    mongoose
      .connect(connectionString, { maxPoolSize: 50 })
      .then(() => {
        console.log("Connected to MongoDB successfully");
        countConnections();
        checkOverload();
      })
      .catch((error) => {
        console.log("Failed to connect to MongoDB with error: ", error);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
