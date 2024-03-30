const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECOND = 5000;

// Count connections
const countConnections = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections:: ${numConnection}`);
};

// Check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage.rss();

    // Example maximum number of connections based on number of cores
    const maxConnections = numCores * 5;
    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024}MB`);

    if (numConnection > maxConnections) {
      console.log(`Connections overload detected`);
    }
  }, _SECOND);
};

module.exports = { countConnections, checkOverload };
