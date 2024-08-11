const express = require('express');
const router = express.Router();

const {validateUpdateTask, validateCreateTask} = require("../middleware/auth");
const Task  = require("../controller/TaskContoller")

router.post("/task",validateCreateTask, Task.createTask);

router.get("/task", Task.getTasks);

router.put("/task/:id", validateUpdateTask, Task.updateTask);

router.delete("/task/:id", Task.deleteTask);


module.exports = router;