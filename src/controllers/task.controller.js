const { Task } = require("../models/task.model");

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            results: tasks.length,
            data: tasks ? tasks : "Empty database",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({
                message: "Task not found",
            });
        } else {
            res.status(200).json({
                data: task,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        res.status(200).json({
            status: "Task created succesfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            status: "Task updated succesfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Task deleted succesfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
