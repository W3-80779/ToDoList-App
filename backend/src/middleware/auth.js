const Joi = require('joi');

const createTaskSchema = Joi.object({
  assignedTo: Joi.string().required().label('Assigned To'),
  priority: Joi.string().valid('high', 'low', 'normal').required().label('Priority'),
  comment: Joi.string().optional().allow('').label('Comment'),
  status: Joi.string().valid('completed', 'inprogress', 'notstarted').required().label('Status'),
  dueDate: Joi.date().required().label('Due Date'),
  isCompleted: Joi.boolean().optional().label('Is Completed')
});

const validateCreateTask = (req, res, next) => {
    const { error } = createTaskSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.details.map((detail) => detail.message),
      });
    }
  
    next();
  };
  




const updateTaskSchema = Joi.object({
  assignedTo: Joi.string().optional().label('Assigned To'),
  priority: Joi.string().valid('high', 'low', 'normal').optional().label('Priority'),
  comment: Joi.string().optional().allow('').label('Comment'),
  status: Joi.string().valid('completed', 'inprogress', 'notstarted').optional().label('Status'),
  dueDate: Joi.date().optional().label('Due Date'),
  isCompleted: Joi.boolean().optional().label('Is Completed')
}).min(1); // Ensure at least one field is provided for update

const validateUpdateTask = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.details.map((detail) => detail.message),
      });
    }
  
    next();
  };
  
  module.exports = {validateUpdateTask, validateCreateTask}

