const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  isCompleted: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'low', 'normal'],
    required: true
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    enum: ['completed', 'inprogress', 'notstarted'],
    default: 'notstarted'
  },
  dueDate: {
    type: Date,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
