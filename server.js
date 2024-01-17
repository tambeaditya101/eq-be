const express = require("express");
const { connection } = require("./connection");
const userRouter = require("./AllRoutes/userRoute");
const booksRouter = require("./AllRoutes/booksRoute");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use(`/users`, userRouter);
app.use(`/books`, booksRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to the DB`);
  } catch (error) {
    console.log(error);
    console.log(`Failed connecting to the DB`);
  }
  console.log(`Server is running on port ${PORT}`);
});
