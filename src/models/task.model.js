const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Task must have a title"]
    },
    description: {
        type: String,
        require: [true, "Task must have a description"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    category: {
        type: Array,
        default: []
    },
    priority: {
        type: Number,
        require: [true, "You need to provide a priority for this task"]
    },
    ownerUsername: String
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
    Task
}