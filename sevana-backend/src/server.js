require("dotenv").config();

const { validateEnvironment } = require("./config/env");
const env = validateEnvironment();

const app = require("./app");

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Sevana Backend is running on port ${PORT}`);
});
