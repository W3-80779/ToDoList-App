const Task = require('../model/TaskModel')

// Controller function to create a new task
const createTask = async (req, res) => {
  try {
    const { assignedTo, priority, comment, status, dueDate } = req.body;

    // Creating a new task
    const newTask = new Task({
      assignedTo,
      priority,
      comment,
      status,
      dueDate
    });

    // Saving the task to the database
    const savedTask = await newTask.save();

    // Sending a response back to the client
    res.status(201).json({
      message: 'Task created successfully',
      task: savedTask
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      message: 'Error creating task',
      error: error.message
    });
  }
};

const getTasks = async (req, res) => {
    try {
      // Extract page and limit from query parameters, with defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;
  
      // Fetch the tasks with pagination
      const tasks = await Task.find().skip(skip).limit(limit);
  
      // Get the total number of tasks
      const totalTasks = await Task.countDocuments();
  
      // Send a response back to the client
      res.status(200).json({
        message: 'Tasks retrieved successfully',
        page,
        limit,
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        tasks
      });
    } catch (error) {
      // Error handling
      res.status(500).json({
        message: 'Error retrieving tasks',
        error: error.message
      });
    }
  };



// Controller function to update a task by ID
const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { assignedTo, priority, comment, status, dueDate, isCompleted } = req.body;
  
      // Find the task by ID and update it with the new data
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
          assignedTo,
          priority,
          comment,
          status,
          dueDate,
          isCompleted
        },
        { new: true, runValidators: true } // Return the updated task and validate the fields
      );
  
      if (!updatedTask) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }
  
      // Send a success response with the updated task
      res.status(200).json({
        message: 'Task updated successfully',
        task: updatedTask
      });
    } catch (error) {
      // Error handling
      res.status(500).json({
        message: 'Error updating task',
        error: error.message
      });
    }
  };



const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the task by ID and delete it
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }
  
      // Send a success response
      res.status(200).json({
        message: 'Task deleted successfully',
        task: deletedTask
      });
    } catch (error) {
      // Error handling
      res.status(500).json({
        message: 'Error deleting task',
        error: error.message
      });
    }
  };

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
