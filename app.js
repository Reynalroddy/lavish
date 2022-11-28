require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();

const connectDb = require("./db/connect");
// const data = require("./data");
const depositRouter = require("./routes/deposit");
const authRouter = require("./routes/auth");
const withdrawRouter = require("./routes/withdraw");
const messageRouter = require("./routes/message");

// 
// mongodb+srv://R3ynal:Reynalroddy2021--@reynal.pml7k.mongodb.net/investment?retryWrites=true&w=majority
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.use(express.json({limit: '50mb'}));
app.use(cors());
app.get('/',(req,res)=>{

  res.send('investor vibes');
})
//base url
app.use("/api/v1/deposits", depositRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/withdraw", withdrawRouter);
app.use("/api/v1/message", messageRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server started!");
      // console.log(data.products);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
