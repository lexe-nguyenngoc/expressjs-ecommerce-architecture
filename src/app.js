require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// Init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init db
require("./dbs/init.mongodb");

// Init router
app.get("/", (req, res) => {
  const strCompress = "Hello my friend!!!";
  res.status(200).json({
    message: "Hello world!",
    metadata: strCompress.repeat(100000),
  });
});

// Handling error

module.exports = app;
