const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const requestsMiddleware = require("./middlewares/requests.middlewares");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

// Middleware
app.use(requestsMiddleware);

// Routes
app.use("/api/v1/auth", authRouter); // http://localhost:8000/api/v1/auth/register
app.use("/api/v1/user", userRouter); // http://localhost:8000/api/v1/user/newUser
app.get("/", (req, res) => res.send("Welcome to my website❤️"));

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
