const Todo=require("../models/todoModels")
const mongoose=require("mongoose")

//get all todo
const getTodos = async (req,res) => {
        
        let page= Number(req.query.page) || 1;
        let limit=Number(req.query.limit) || 1;

        let skip=(page-1)*(limit)
        const  toDo = await Todo.find({}).skip(skip).limit(limit)

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
const  searchByField = async (req,res) => {

  let page= Number(req.query.page) || 1;
  let limit=Number(req.query.limit) || 1;

  let skip=(page-1)*(limit)
      let data = await Todo.find({
        "$or":
        [
          {
            title:{$regex:req.params.key}
          },
          {
            task:{$regex:req.params.key}
          },
          {
            date:{$regex:req.params.key}
          }

        ]

      }).skip(skip).limit(limit)
      return res.json(data)
}


module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    searchByField
}