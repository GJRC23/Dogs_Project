require("dotenv").config();

module.exports = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  API_URL: process.env.REACT_APP_API_URL || "https://api.thedogapi.com/v1/breeds",
};
