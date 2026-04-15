const User= require("../models/User")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")


const RegisterUser= async (req,res)=>{
    try{
    const {name, email, password}=req.body;
    if (!email || !name || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const existing = await User.findOne({email});
    if (existing){
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass= await bcrypt.hash(password, salt);
    const user= await User.create({name,email, password: hashedpass})
    res.status(201).json({
        message: "Registered Successfully", user:{
        id: user._id, name: user.name, email:user.email
        }
    });

}
catch(error){
    res.status(500).json({message:"Server Error"});
};
}

const LoginUser= async (req,res)=>{

    try{
        const {email,password}=req.body;
        const existing = await User.findOne({email});
        if (! existing){
            return res.status(400).json({message: "Please Register first"});


        }
        const isMatch = await bcrypt.compare(password, existing.password);

        if (! isMatch){
            return res.status(400).json({message: "Wrong password"});

        }
        const token= jwt.sign({id: existing._id},process.env.JWT,{expiresIn:"1d"});
        res.status(200).json({
            message:"User Login Successfull", token,user: {
        id: existing._id,
        name: existing.name,
        email: existing.email
    }
        });


    }
    catch (error){
        res.status(500).json({
            message:"Server error "
        })
    }
}
module.exports = {RegisterUser,LoginUser};