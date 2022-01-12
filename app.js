require("dotenv").config();
const express = require("express");
const app = express();
const Student = require("./modals.js/students");
const connectDB = require("./db/connect");
const studentRouter = require("./routers/students");

const port = process.env.PORT || 3000;
const router = new express.Router();

app.use(express.json());
app.use(studentRouter);

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listing on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
