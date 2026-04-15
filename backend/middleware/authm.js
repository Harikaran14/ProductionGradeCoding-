const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req,res,next)=>{
    try{
    const authHead= req.headers.authorization;
    if (!authHead)
    {
    return res.status(401).json({
        message: "Not token present"
    });

    }

    const token= authHead.split(" ")[1];
    const decoded=jwt.verify(token, process.env.JWT);
    req.user=await User.findById(decoded.id).select("-password");
    next();

}
catch(error){
  res.status(500).json({message:"Server Error"});
};


}
module.exports=protect;

