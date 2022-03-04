// req.params comes from URL
// req.body comes from front end i.e. submitting inputs

const Task = require('./../models/task');
// custom middleware wrapper to handle try/catch for all routes (cleaner code and more readable)
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  // empty {} in method .find gets all tasks
  const tasks = await Task.find({});

  // Wrapped { tasks } to get object and in there I have tasks array from db.
  // That way I can keep it consistent, where I always get back the object just with different properties.
  // If you go json(tasks) you get back tasks array, which is fine but it also means that the response type is changing, one time it's array next object, making (in my opinion) harder for front-end.
  // Most times, I use axios on front-end and it assigns response to data object, this way I know, that I need to look for properties inside data object.
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // Make sure to use 'return' to return from function  in case task is null/undefined
    // this returns 404 when id syntax matches mongoose one but is not found
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  // possible responses:
  // res.status(200).send()
  // res.status(200).json({ task });
  res.status(200).json({ task: null, status: 'success' });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  // By default we get old object response value (and still can pass empty string in req which we don't want), if you want send json with updated response values and have a control over it you need to provide object with options.
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    // response with new values (default settings show/response with old values)
    new: true,
    // uses validators from mongoose schema (models/task.js)
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
