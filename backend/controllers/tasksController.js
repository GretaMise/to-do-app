// const Tasks = require('../models/tasksModel');

// // all
// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Tasks.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // create
// exports.createTask = async (req, res) => {
//   try {
//     const { name, task } = req.body;

//     if (!name || !task) {
//       return res.status(400).json({ error: 'Please fill in all fields' });
//     }

//     const newTask = new Tasks({ name, task });
//     await newTask.save();

//     res.status(201).json({ message: 'Task created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating task' });
//   }
// };

// // update

// exports.updateTask = async (req, res) => {
//   try {
//     const taskId = req.params.id;
//     const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedTask) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json({ message: 'Task updated' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // delete

// exports.deleteTask = async (req, res) => {
//   try {
//     const taskId = req.params.id;
//     const deletedTask = await Tasks.findByIdAndDelete(taskId);

//     if (!deletedTask) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(201).json({ message: 'Task deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const Tasks = require('../models/tasksModel');

// all
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// create
exports.createTask = async (req, res) => {
  try {
    const { name, task, description, status } = req.body;

    if (!name || !task) {
      return res
        .status(400)
        .json({ error: 'Please fill in all required fields' });
    }

    const newTask = new Tasks({
      user: req.user._id,
      name,
      task,
      description: description || '',
      status: status || 'nebaigta',
    });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

// update
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Tasks.findOne({ _id: taskId, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { name, task: taskName, description, status } = req.body;

    if (name !== undefined) task.name = name;
    if (taskName !== undefined) task.task = taskName;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// delete
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Tasks.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(201).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
