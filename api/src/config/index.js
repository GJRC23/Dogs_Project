require("dotenv").config();

module.exports = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3001,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "1234",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DATABASE: process.env.DB_DATABASE || "dogs",
  API_URL: process.env.API_URL || "https://api.thedogapi.com/v1/breeds",
  API_KEY: process.env.API_KEY || "live_myK9CYC2ZB9Tvvl9keTj0mwzGliNndPpdwO6OZfxQsY3FocgTgUPaev8uS2c8xg9",
};
