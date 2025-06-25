const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.render('tasks/list', { tasks });
};

exports.renderNewTaskForm = (req, res) => {
  res.render('tasks/new');
};

exports.createTask = async (req, res) => {
  const { title, assignedTo, dueDate, status } = req.body;
  await Task.create({ title, assignedTo, dueDate, status });
  res.redirect('/');
};

exports.renderEditTaskForm = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render('tasks/edit', { task });
};

exports.updateTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
