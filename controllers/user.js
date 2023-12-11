
const User=require("../models/user");


async function handleGetAllUsers(req, res){
  const users = await User.find({});
  return res.json(users);
};
async function handleGetById(req,res){
    const uid = Number(req.params.id);
  const user = await User.findById(uid);
  if(!user){
    return res.status(400).json({error:"user not found"});
  }
  return res.json(user);
}

async function handleUpdateById(req,res){
    await User.findByIdAndUpdate(req.params.id,{ lastName:"Bisht"});
    res.status(201).json({ status : "changed" });
}
async function handleDeleteById(req,res){
    try{
    await User.findByIdAndDelete(req.params.id);
      return res.json({status :"Success"});
      }
      catch{
        res.json({ msg:"No deletion occur"});
      }
}
async function handleDeleteAllUsers(req,res){
     
    await User.deleteMany({});
    res.status(201).json({status:"success"});
}
async function handleCreateUsers(req,res){
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
    const contact=new User({
        NumId: body.NumId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
  
    })
    try {
      
  
      const news=await contact.save();
      res.json(news);
     
    } catch (error) {
      console.error("Failed to save contact", error);
      res.status(500).json({msg:"error"});
    }
}
module.exports={
    handleGetAllUsers,handleGetById,  handleUpdateById ,
    handleDeleteById,  handleDeleteAllUsers,
    handleCreateUsers 
}