const Task = require("../models/Task");

//POST a new Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: newTask,
      message: "New Task created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};

//GET all tasks
exports.viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      data: tasks,
      message: "Here are your listed tasks",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};

//GET a user specified Task
exports.findTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Task.findById({ _id: id, owner: req.user._id });

    res.status(200).json({
      success: true,
      data: response,
      message: "Task found with id ",
      id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};

//Update a Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status } = req.body;

    const response = await Task.findByIdAndUpdate(
      { _id: id, owner: req.user._id },
      { title, description, status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: response,
      message: "Task updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};

//Delete a Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Task.findByIdAndDelete({
      _id: id,
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};
