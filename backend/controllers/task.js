const Task= require("../models/Task")

const createTask = async (req,res)=>{
    try{
    const{title, description}=req.body;
    if (!title){
        return res.status(400).json({
            message:"title must not be empty"
        })
    }
    const task = await Task.create({
        title,description,user:req.user._id
    });
    res.status(201).json({
        message: "Task created successfully",task
    });
}
catch(error){

        res.status(500).json({
            message: "Server error"
        });
}
}

const getTask = async (req,res)=>{
    try{
        console.log(req);
        const task= await Task.find({user: req.user._id});
        res.status(200).json({
            task
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports={createTask, getTask};
