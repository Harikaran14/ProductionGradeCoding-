const express =require("express");
const router= express.Router();
const {RegisterUser,LoginUser}= require("../controllers/auth")
const protect= require("../middleware/authm")

router.get('/test',(req,res)=>{
    res.send("Majja ");
});
router.get("/profile", protect,(req,res)=>{
    res.json({
        message:"Using protected route access",
        user: req.user
    });
})
router.post("/register",RegisterUser);
router.post("/login",LoginUser);

module.exports=router;