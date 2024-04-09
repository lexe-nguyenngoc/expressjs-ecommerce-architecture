const app = require("./src/app");
const configs = require("./src/configs");

const PORT = configs.app.PORT;

const server = app.listen(PORT, () => {
  console.log(`WSV ECommerce is running on PORT: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
