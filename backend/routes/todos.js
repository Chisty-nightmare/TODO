const express= require("express");
const
{
    createTodo,
    getTodos,
    getTodo,
    updateTodo
}=require("../controller/todoController")
const router= express.Router();


router.get("/", getTodos)

router.get("/:id",getTodo)
router.post("/", createTodo)

router.put("/:id", updateTodo)

module.exports = router;