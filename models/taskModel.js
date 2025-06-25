const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: String, required: true },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Task', taskSchema);
