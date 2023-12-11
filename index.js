const express = require("express");
// const mongoose = require("mongoose");
const connectMongoDb=require("./connection");
const app = express();
const PORT = 8000;

const userRouter=require("./routes/user");

app.use(express.urlencoded({extended: false}));


connectMongoDb("mongodb://127.0.0.1:27017/codes")
.then(() => {console.log("Connected successfully");} )
.catch((err) => console.log("Mongoose error:", err) );


app.use("/api/users",userRouter);


app.listen(PORT, () => {
  console.log("Server Created!");
});
