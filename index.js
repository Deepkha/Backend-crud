const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8000;

// app.use(express.json()); // Use express.json() for parsing JSON requests

app.use(express.urlencoded({extended: false}));
mongoose
  .connect("mongodb://127.0.0.1:27017/code")
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log("Mongoose error:", err));

const userSchema = new mongoose.Schema({
    NumId:{
        type:Number,
        unique:true,
        required:true,
    },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},
{timestamps:true}
);

const User = mongoose.model("user", userSchema);

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const uid = Number(req.params.id);
  const user = await User.findById(uid );
  if(!user){
    return res.status(400).json({error:"user not found"});
  }
  return res.json(user);
});



app.post("/api/users", async (req, res) => {
  const body = req.body;
  if ( !body ||
     !body.firstName ||
      !body.lastName || 
      !body.gender ||
      !body.email || 
      !body.jobTitle ||
      !body.NumId ) {

    return res.status(400).json({ msg: "All fields should be filled" });    
  }

  const result = await User.create(
    {
     NumId:body.NumId,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  })

  return res.status(201).json({ msg: "Success" });
});
app.patch("/api/users/:id",async (req,res) =>{
    await User.findByIdNumAndUpdate(req.params.id,{ lastName:"Bisht"});
    res.status(201).json({ status : "changed" });
})
app.delete("/api/users/:id",async(req,res) =>{
    try{
      await User.findByIdNumAndDelete(req.params.id);
    return res.json({status :"Susccess"});
    }
    catch{
      res.json({ msg:"No deletion occur"});
    }
  })


app.delete("/api/users", async(req,res) =>{
   
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({status:"success"});
})




app.listen(PORT, () => {
  console.log("Server Created!");
});
