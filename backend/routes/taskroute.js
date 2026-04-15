const express = require("express");
const router =express.Router();
const protect= require("../middleware/authm");
const { createTask , getTask, updateTask} = require("../controllers/task");
console.log("Task route loaded");
router.post("/",protect, createTask);
router.get("/test",(req,res)=>{
    return res.json({
        message:"working"
    });
})
router.get("/",protect, getTask);
router.put("/:id",protect,updateTask);
module.exports = router;