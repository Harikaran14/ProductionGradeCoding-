require("dotenv").config()
const express= require("express")
const cors= require("cors")
const connectDB = require("./config/db")
const authr= require("./routes/authr")
const taskroute = require("./routes/taskroute")

const app= express();
app.use(cors());
app.use (express.json());
connectDB()
app.use("/api/auth",authr);
app.use("/api/tasks",taskroute);
const port=process.env.PORT || 5000
app.listen(port , ()=> {
    console.log(`server is running at port : ${port}`)
}
)