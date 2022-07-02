const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const requestsMiddleware = require('./middlewares/requests.middlewares');

// Middleware
app.use(requestsMiddleware)

const PORT = 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
