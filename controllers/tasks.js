const Task = require('./../models/task');

// req.params comes from URL
// req.body comes from front end i.e. submitting inputs

const getAllTasks = async (req, res) => {
  try {
    // empty {} in method .find gets all tasks
    const tasks = await Task.find({});

    // Wrapped { tasks } to get object and in there I have tasks array from db.
    // That way I can keep it consistent, where I always get back the object just with different properties.
    // If you go json(tasks) you get back tasks array, which is fine but it also means that the response type is changing, one time it's array next object, making (in my opinion) harder for front-end.
    // Most times, I use axios on front-end and it assigns response to data object, this way I know, that I need to look for properties inside data object.
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

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      // Make sure to use 'return' to return from function  in case task is null/undefined
      // this if returns 404 when id syntax matches mongoose one but is not found
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    // error return msg if id syntax is wrong (error comes from mongoose)
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    // possible responses:
    // res.status(200).send()
    // res.status(200).json({ task });
    res.status(200).json({ task: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // By default we get old object response value (and still can pass empty string in req which we don't want), if you want send json with updated response values and have a control over it you need to provide object with options.
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
      // response with new values
      new: true,
      // uses validators from mongoose schema (models/task.js)
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
