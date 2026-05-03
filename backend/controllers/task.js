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
    console.log(error);
        res.status(500).json({
            message: "Server error"
        });
}
}

const getTask = async (req,res)=>{
    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip= (page-1)*limit;
        const total = await Task.countDocuments({user:req.user._id});

        const task= await Task.find({user: req.user._id}).skip(skip).limit(limit);
        res.status(200).json({
            page,limit,total, count:task.length,
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
const updateTask = async (req,res)=>{
try{
    const taskid=req.params.id;
    const task =await Task.findById(taskid);
    if (!task){
        return res.status(404).json({
            message:"No such task exists"
        });
    
    } 
    if (task.user.toString()!= req.user._id.toString()){
        return res.status(403).json({
            message:"Not Authorized to update the task"
        });
    
    }

    task.title= req.body.title || task.title;
    task.description=req.body.description || task.description;
    task.status = req.body.status || task.status;
    await task.save();

    res.status(200).json({
        message:"Updated successfully ", task
    });

}
catch(error){
    console.log(error);
        res.status(500).json({
            message: "Server error"
        });
}

}

const deleteTask = async (req,res)=>{
try{
    console.log("inside delete");
    const taskid=req.params.id;
    const task =await Task.findById(taskid);
    if (!task){
        return res.status(404).json({
            message:"No such task exists"
        });
    
    } 
    if (task.user.toString()!= req.user._id.toString()){
        return res.status(403).json({
            message:"Not Authorized to delete the task"
        });
    
    }

    
    await task.deleteOne();
    res.status(200).json({
        message:"Deleted successfully "
    });

}
catch(error){
    console.log(error);
        res.status(500).json({
            message: "Server error"
        });
}

}
module.exports={createTask, getTask, updateTask,deleteTask};
 