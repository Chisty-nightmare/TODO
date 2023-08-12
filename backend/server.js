require("dotenv").config()
const express= require("express") // Express.js
const app=express()// start express app
const todoRoutes= require("./routes/todos")
const mongoose=require("mongoose")

//midlleware
app.use((req,res,next)=>
{
    console.log(req.path,req.method)
    next()
})


//route
app.use(express.json())
app.use("/api/todo", todoRoutes)


mongoose.connect(process.env.M_URL)
.then(()=>
{
    app.listen(process.env.PORT, function() {
        console.log("Listen to port",process.env.PORT)
    })
}

)
.catch((error)=>
{
    console.log(error.message);
})



