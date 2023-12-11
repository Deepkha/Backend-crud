const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    NumId: {
      type: Number,
      unique:true,
      required:true,
    },
    firstName: {
      type: String,
      unique:true,
      required:true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique:true,
      required:true,
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
module.exports=User;