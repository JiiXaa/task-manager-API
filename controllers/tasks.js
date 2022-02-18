const Task = require('./../models/task');

const getAllTasks = async (req, res) => {
  try {
    // empty {} in method .find gets all tasks
    const tasks = await Task.find({});

    // Wrapped { tasks } to get object and in there I have tasks array from db.
    // That way I can keep it consistent, where I always get back the object just with different properties.
    //If you go json(tasks) you get back tasks array, which is fine but it also means that the response type is changing, one time it's array next object, making (in my opinion) harder for front-end.
    //Most times, I use axios on front-end and it assigns response to data object, this way I know, that I need to look for properties inside data object.
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
