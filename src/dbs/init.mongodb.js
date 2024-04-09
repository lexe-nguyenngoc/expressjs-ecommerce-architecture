const mongoose = require("mongoose");
const {
  db: { host, name, port },
  NODE_ENV,
} = require("../configs");
const { NODE_ENVS } = require("../constants");

const connectionString = `mongodb://${host}:${port}/${name}`;

class Database {
  static instance;

  constructor() {
    this.connect();
  }

  async connect(type = "mongodb") {
    if (NODE_ENV === NODE_ENVS.DEV) {
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString, { maxPoolSize: 50 })
      .then(() => {
        console.log("Connected to MongoDB successfully");
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
