const Todo=require("../models/todoModels")
const mongoose=require("mongoose")

//get all todo
const getTodos = async (req,res) => {
        const toDo = await Todo.find({})
       return res.status(200).json(toDo)
}


//get a single todo

const getTodo = async (req,res) => {
    
    const{ id } =req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return  res.status(404).json({error: "No such todo"})
    }
    const toDo = await Todo.findById(id)
    if(!toDo){
      return  res.status(404).json({error:"No such Todo"})
    }
    return res.status(200).json(toDo)
}

//post a todo
const createTodo = async (req,res) => {

    const{title, task, date}=req.body           // new todo object
    //res.json({msg:"Get post"})
    try
    {
        const toDo= await Todo.create({title,task,date})
       return  res.status(200).json(toDo)
    }catch(e)
    {
       return res.status(400).json({e:e.message})
    }

}




//put a todo

const updateTodo = async (req,res) => {

    const{ id } =req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return  res.status(404).json({error: "No such todo"})
    }
    const toDo = await Todo.findOneAndUpdate({_id: id},
        {
            ...req.body
        })
    if(!toDo){
      return  res.status(404).json({error:"No such Todo"})
    }
    return res.status(200).json(req.body)

}
module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo
}