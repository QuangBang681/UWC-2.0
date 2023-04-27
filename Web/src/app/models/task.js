const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { EmployeeSchema } = require('./employee');

const TaskSchema = new mongoose.Schema(
    {
        date: {type: Date, required: true},
        time_start: {type: String, required: true},
        time_end: {type: String, required: true},
        state: {type: Number, required: true},
        assignment: [{type: ObjectId, unique: true, ref: 'Employee'}]
    },
    {collection: 'task'}
);

module.exports = mongoose.model('Task', TaskSchema);