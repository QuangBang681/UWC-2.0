const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { EmployeeSchema } = require('./employee');

const TaskSchema = new mongoose.Schema(
    {
        _id: {type: ObjectId, required: true},

        date: {type: Date, required: true},
        time_start: {type: Date, required: true},
        time_end: {type: Date, required: true},
        assignment: [{type: ObjectId, ref: 'Employee'}]
    },
    {collection: 'task'}
);

module.exports = mongoose.model('Task', TaskSchema);